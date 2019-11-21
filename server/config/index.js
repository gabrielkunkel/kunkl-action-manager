module.exports = {

    port: process.env.PORT || 3001,
  
    roles: ["guest", "user", "admin"],

    auth0Domain: "kunkl-dev.auth0.com",

    auth0Audience: "http://localhost:3001"
  
  }
  