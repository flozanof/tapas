'use strict';

const express = require('express');
const path = require("path");
const api = express.Router();

//definir el root de la aplicacion
api.use(express.static(path.join(__dirname, "build")));

api.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, "build", "./build/index.js"));
});

module.exports = api;