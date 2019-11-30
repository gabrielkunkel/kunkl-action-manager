import auth0 from "auth0-js";
import secret from "../Config/secret";
import axios from 'axios'
import config from '../Config'

export default class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
    this.auth0 = new auth0.WebAuth({
      domain: secret.REACT_APP_AUTH0_DOMAIN,
      clientID: secret.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: secret.REACT_APP_AUTH0_CALLBACK_URL,
      audience: secret.REACT_APP_AUTH0_AUDIENCE,
      responseType: "token id_token",
      scope: "openid profile email"
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  registerUpdateUser = async () => {

    try {

      const token = await this.getAccessToken();

      this.getProfile((profile, error) => {
        axios.post("http://localhost:3001" + config.apiRoutes.addUser, {
          _id: profile.sub,
          name: profile.name,
          picture: profile.picture,
          email: profile.email,
          role: "user"
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'application/json;charset=UTF-8',
          }
        }).then(response => {
          console.log("received profile back: ", response.data);
          this.history.push("/home");
        }).catch(err => {
          console.error(err);
        });
      });

    } catch (error) {
      console.error(error);
    }

  }

  handleAuthentication = async () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.push("/home");
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  };

  setSession = authResult => {
    console.log(authResult);
    // set the time that the access token will expire
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
  };

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.userProfile = null;
    this.auth0.logout({
      clientID: secret.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000"
    });
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    return accessToken;
  };

  getProfile = cb => {
    if (this.userProfile) return cb(this.userProfile);

    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, err);
    });
  };


}