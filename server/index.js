const mongoose = require("mongoose");
const getSecret = require("./config/secret");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const config = require("./config");

const API_PORT = config.port;
const app = express();

// mongo
mongoose.connect(getSecret("dbUri"));
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

require("./api").default(app)

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
