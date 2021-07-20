'use strict'
var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated'); 
var connectMultiparty = require('connect-multiparty');
var userController = require('../controllers/user.controller');
var classController = require('../controllers/class.controller');

//var mdUpload = connectMultiparty({ uploadDir: './uploads/users'});


api.post('/login', userController.login);

//STUDENT
api.post('/studentSave', userController.studentSave);
//TEACHER
api.post('/teacherSave', userController.teacherSave);

//CLASS
api.post('/saveClass/:id' ,mdAuth.ensureAuth,classController.saveClass);


module.exports = api;




