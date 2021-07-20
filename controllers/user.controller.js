'use strict'

var User = require('../models/user.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

//user
//CREATE INIT
function createInit(req,res){
    let user = new User();
    user.password = 'tuto123';
    user.username = 'ADMIN';

    User.findOne({username: user.username}, (err, userFind)=>{
            if(err){
                console.log('Error general');
            }else if(userFind){
                console.log('no se puede agregar un nuevo usuario administrador');
            }else{
                bcrypt.hash(user.password, null, null, (err, passwordHash)=>{
                    if(err){
                        console.log('Error al crear el usuario');
                    }else if(passwordHash){
                       
                        user.username = 'ADMIN'
                        user.name='ADMIN'
                        user.role = 'ROLE_ADMIN'    
                        user.password = passwordHash;
                            
                        user.save((err, userSaved)=>{
                            
                            if(err){
                                console.log('Error al crear el usuario');
                            }else if(userSaved){
                                console.log('Usuario administrador creado');
                               
                                
                            }else{
                                console.log('Usuario administrador no creado');
                            }
                        })
                    }else{
                        console.log('No se encriptó la contraseña');
                    } 
                })
            }
    })
}

<<<<<<< Updated upstream
//LOGIN

=======
>>>>>>> Stashed changes
//--------STUDENT------------
//SAVE STUDENT
function studentSave(req, res){
    var user = new User();
    var params = req.body;

    if(params.name && params.lastname && params.username && params.password){
        User.findOne({username: params.username}, (err, userFind)=>{
            if(err){
                return res.status(500).send({message: 'ERROR GENERAL', err});
            }else if(userFind){
                return res.send({message: 'El nombre de usuario que ingresaste ya está en uso, ingresa otro nuevo'});
            }else{
                bcrypt.hash(params.password, null, null, (err, passwordHash)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general al comparar contraseña'});
                    }else if(passwordHash){
                        user.name = params.name;
                        user.lastname = params.lastname;
                        user.username = params.username;
                        user.password = passwordHash;
                        user.role = "ROLE_STUDENT";
                        user.save((err, userSaved)=>{
                            if(err){
                                return res.status(500).send({message: 'ERROR GENERAL AL GUARDAR EL USUARIO ESTUDIANTE', err});
                            }else if(userSaved){
                                return res.send({message: 'Usuario estudiante creado exitosamente', userSaved});
                            }else{
                                return res.status(500).send({message: 'No se guardó el usuario', err});
                            }
                        })
                    }else{
                        return res.status(403).send({message: 'La contraseña no se ha encriptado'});
                    }
                })
            }
        })
    
    }else{
        return res.status(401).send({message: 'Por favor envía los datos mínimos para la creación del usuario'})
    }
}



//--------TEACHER------------
//SAVE TEACHER
function teacherSave(req, res){
    var user = new User();
    var params = req.body;

    if(params.name && params.lastname && params.username && params.password){
        User.findOne({username: params.username}, (err, userFind)=>{
            if(err){
                return res.status(500).send({message: 'ERROR GENERAL', err});
            }else if(userFind){
                return res.send({message: 'El nombre de usuario que ingresaste ya está en uso, ingresa otro nuevo'});
            }else{
                bcrypt.hash(params.password, null, null, (err, passwordHash)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general al comparar contraseña'});
                    }else if(passwordHash){
                        user.name = params.name;
                        user.lastname = params.lastname;
                        user.username = params.username;
                        user.password = passwordHash;
                        user.role = "ROLE_TEACHER";
                        user.save((err, userSaved)=>{
                            if(err){
                                return res.status(500).send({message: 'ERROR GENERAL AL GUARDAR EL USUARIO PROFESOR', err});
                            }else if(userSaved){
                                return res.send({message: 'Usuario profesor creado exitosamente', userSaved});
                            }else{
                                return res.status(500).send({message: 'No se guardó el usuario', err});
                            }
                        })
                    }else{
                        return res.status(403).send({message: 'La contraseña no se ha encriptado'});
                    }
                })
            }
        })
    
    }else{
        return res.status(401).send({message: 'Por favor envía los datos mínimos para la creación del usuario'})
    }
}




<<<<<<< Updated upstream
//----SAVE STUDENT
//----UPDATE STUDENT
//----DELETE STUDENT
//----SEARCH STUDENT
//----GET STUDENTS

//--------TEACHER------------

//----SAVE TEACHER
//----UPDATE TEACHER
//----DELETE TEACHER
//----SEARCH TEACHER
//----GET TEACHERS
=======
module.exports = {
    createInit,
    //STUDENT
    studentSave,
    teacherSave
}
>>>>>>> Stashed changes
