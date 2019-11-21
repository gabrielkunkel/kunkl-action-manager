const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
import config from "../config";

export function checkJwt() {
    return jwt({
        secret: jwksRsa.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://${
            config.auth0Domain
          }/.well-known/jwks.json`
        }),
      
        audience: config.auth0Audience,
        issuer: `https://${config.auth0Domain}/`,
      
        algorithms: ["RS256"]
      });
}

    