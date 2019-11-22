export default function (app) {

    app.use("/users", require("./user"))
    app.use("/actions", require("./action"))
  }