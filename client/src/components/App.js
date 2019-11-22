import React, { Component } from "../../node_modules/react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import { Nav } from "./Nav";
import Auth from "../Auth/Auth"
import Callback from "./Callback";

class App extends Component {

  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history); // can be in state; could be instantiated in auth
  }

  state = {
    data: [],
  };

  render() {
   
    return (
      <div>
       <Nav auth={this.auth} />
        <div className="body">
          <Route
            path="/"
            exact
            render={props => <Home auth={this.auth} {...props} />}
          />
          <Route
            path="/profile"
            render={props =>
              this.auth.isAuthenticated() ? (
                <Profile auth={this.auth} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/callback"
            render={props => <Callback auth={this.auth} {...props} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
