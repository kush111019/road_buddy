const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const multer = require("multer");
const bodyParser = require('body-parser');
const route = require("./routes/webApp/route");
require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())


//sanitize request data
app.use(xss());
app.use(mongoSanitize());
app.use('/',route)
// gzip compression
app.use(compression());

// enable cors
app.use(cors());


module.exports = app;