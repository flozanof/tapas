'use strict';

const express = require('express');
const api = express.Router();
var multer = require('multer')
var cors = require('cors');

api.get('/', (req,res)=>{
  res.send({message: 'Hello World 2!'});
});

//CORS middleware.
api.use(cors())

//Create a multer instance and set the destination folder
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img/'+req.params.tournament+'/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

//Create an upload instance and receive a single file
var upload = multer({ storage: storage }).single('file')

//Setup thePOSTroute to upload a file
api.post('/upload/:tournament', function (req, res) {
  console.log('#####  Server.js / tournamet: ' + req.params.tournament + ' #######');
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log('#####  Error MulterError: ' + err);
      return res.status(500).json(err)
    } else if (err) {
      console.log('#####  Error sin calificar: ' + err);
      return res.status(500).json(err)
    }
    console.log('#####  TODO OK #### ');
    return res.status(200).send(req.file.filename)
  })

});

module.exports = api;