const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
import secret from "../config/secret";

export async function checkJwt() {

    console.log("Check Jwt is running!");

    return await jwt({
        secret: jwksRsa.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://${
            secret.auth0Domain
          }/.well-known/jwks.json`
        }),
      
        audience: secret.auth0Audience,
        issuer: `https://${secret.auth0Domain}/`,
        algorithms: ["RS256"]
      });
}

    