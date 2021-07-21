'use strict'
var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated'); 
var connectMultiparty = require('connect-multiparty');
var userController = require('../controllers/user.controller');
var classController = require('../controllers/class.controller');

//var mdUpload = connectMultiparty({ uploadDir: './uploads/users'});


api.post('/login', userController.login);
api.put('/deleteUser/:idU', mdAuth.ensureAuth, userController.deleteUser);
api.put('/updateUser/:idU', mdAuth.ensureAuth, userController.updateUser);
//STUDENT
api.post('/studentSave', userController.studentSave);
api.get('/getstudents', userController.getStudents);
api.post('/searchStudent', userController.searchStudents);

//TEACHER
api.post('/teacherSave', userController.teacherSave);
api.get('getTeachers', userController.getTeachers);
api.post('/searchTacher', userController.searchTeachers);

//CLASS
api.post('/saveClass/:id' ,mdAuth.ensureAuth,classController.saveClass);
api.delete('/deleteClass/:idT/:idC' ,mdAuth.ensureAuth,classController.deleteClass);
api.put('/updateClass/:idU/:idC', mdAuth.ensureAuth,classController.updateClass);

module.exports = api;




