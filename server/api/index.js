export default function (app) {

    app.use("/api/users", require("./user"))
    app.use("/api/actions", require("./action"))
  }