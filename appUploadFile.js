const express = require('express');
const appUploadFile = express();
const routes = require('./routesUpFile.js');

appUploadFile.use('/',routes);

module.exports = appUploadFile;