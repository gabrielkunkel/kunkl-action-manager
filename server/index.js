const mongoose = require("mongoose");
const getSecret = require("./config/secret");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
import secret from './config/secret'
import config from './config'
import cors from 'cors'

const API_PORT = config.port;
const app = express();

// mongo
mongoose.connect(secret.dbUri);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());

require("./api").default(app)

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
