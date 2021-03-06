'use strict'
var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated'); 
var connectMultiparty = require('connect-multiparty');
var userController = require('../controllers/user.controller');
var classController = require('../controllers/class.controller');
var mdUpload = connectMultiparty({ uploadDir: './uploads/user'});

//var mdUpload = connectMultiparty({ uploadDir: './uploads/users'});


api.post('/login', userController.login);
api.put('/deleteUser/:idU', mdAuth.ensureAuth, userController.deleteUser); 
api.put('/updateUser/:idU', mdAuth.ensureAuth, userController.updateUser);
api.put('/uploadImage/:idU', [mdAuth.ensureAuth, mdUpload], userController.uploadImage);
api.get('/getImage/:fileName', [mdUpload], userController.getImage);
//ADMIN
api.delete('/deleteuserByAdmin/:idU/:idAdmin', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.deleteUserByAdmin);

api.get('/getUsers', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.getUsers);

//STUDENT
api.post('/studentSave', userController.studentSave);
api.get('/getstudents', userController.getStudents);
api.post('/searchStudent', userController.searchStudents);
api.put('/inscription/:idS/:idC',userController.inscription);
api.delete('/deleteInscription/:idS/:idC', mdAuth.ensureAuth, userController.deleteInscription);

//TEACHER
api.post('/teacherSave', userController.teacherSave);
api.get('getTeachers', userController.getTeachers);
api.post('/searchTacher', userController.searchTeachers);

//CLASS
api.post('/saveClass/:id' ,mdAuth.ensureAuth,classController.saveClass);
api.delete('/deleteClass/:idT/:idC', mdAuth.ensureAuth,classController.deleteClass);
api.put('/updateClass/:idU/:idC', mdAuth.ensureAuth,classController.updateClass);
api.get('/listClassByS/:idS', classController.listClassByS);
api.get('/listClassByT/:idT', classController.listClassByT);
api.get('/allClasses/:idU', mdAuth.ensureAuth, classController.allClasses);
api.get('/getClass/:idC', classController.getClass);

//COMMENT
api.put('/saveComment/:idU/:idC', mdAuth.ensureAuth, classController.saveComment);
api.delete('/deleteComment/:idU/:idCl/:idCo', mdAuth.ensureAuth, classController.deleteComment);
api.put('/updateComment/:idU/:idCl/:idCo', mdAuth.ensureAuth, classController.updateComment);
api.get('/getComments/:idU/:idC', classController.getComments);
api.put('/uploadImageC/:idU/:idC', [mdAuth.ensureAuth, mdUpload], classController.uploadImageC);
api.get('/getImageC/:fileName', [mdUpload], classController.getImageC);


//FILES
api.put('/uploadImageC/:idU/:idC', [mdAuth.ensureAuth, mdUpload], classController.uploadImageC);
api.get('/getImageC/:fileName', [mdUpload], classController.getImageC);
api.get('/getFiles/:idC', mdAuth.ensureAuth, classController.getFiles);







module.exports = api;




