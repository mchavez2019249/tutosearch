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
api.get('/getstudents', userController.getStudents);
api.post('/searchStudent', userController.searchStudents);
api.put('/inscription/:idS/:idC', mdAuth.ensureAuth,userController.inscription);
//TEACHER
api.post('/teacherSave', userController.teacherSave);
api.get('getTeachers', userController.getTeachers);
api.post('/searchTacher', userController.searchTeachers);

//CLASS
api.post('/saveClass/:id' ,mdAuth.ensureAuth,classController.saveClass);
api.delete('/deleteClass/:idT/:idC' ,mdAuth.ensureAuth,classController.deleteClass);
api.put('/updateClass/:idU/:idC', mdAuth.ensureAuth,classController.updateClass);
api.get('/listClassByS/:idS', classController.listClassByS);
api.get('/listClassByT/:idT', classController.listClassByT);

module.exports = api;




