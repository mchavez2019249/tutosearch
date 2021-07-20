'use strict'

var express = require('express');
//var userController = require('../controllers/user.controller');
const { ensureAuth } = require('../middlewares/authenticated');
var api = express.Router();
//var mdAuth = require('../middlewares/authenticated');
var connectMultiparty = require('connect-multiparty');
//var mdUpload = connectMultiparty({ uploadDir: './uploads/users'});
var connect = require('connect-multiparty');

//USUARIOS

//TUTOR 

//ESTUDIANTE

module.exports = api;
