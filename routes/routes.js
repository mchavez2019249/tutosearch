'use strict'
var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated'); 
var connectMultiparty = require('connect-multiparty');
var userController = require('../controllers/user.controller');
var classController = require('../controllers/class.controller');

//var mdUpload = connectMultiparty({ uploadDir: './uploads/users'});


api.post('/login', userController.login);
api.delete('/deleteUser/:idU', mdAuth.ensureAuth, userController.deleteUser);
//STUDENT
api.post('/studentSave', userController.studentSave);
//TEACHER
api.post('/teacherSave', userController.teacherSave);

//CLASS
api.post('/saveClass/:id' ,mdAuth.ensureAuth,classController.saveClass);



api.get('getTeachers', userController.getTeachers);


api.get('/getstudents', userController.getStudents);


api.post('/searchStudent', userController.searchStudents);

api.post('/searchTacher', userController.searchTeachers);

module.exports = api;




