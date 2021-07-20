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


//LOGIN
function login(req, res){
    var params = req.body;

    if(params.username && params.password){
        User.findOne({username: params.username}, (err, userFind)=>{
            if(err){
                return res.status(500).send({message: 'ERROR GENERAL', err});
            }else if(userFind){
                bcrypt.compare(params.password, userFind.password, (err, passwordCheck)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general al comparar contraseñas'});
                    }else if(passwordCheck){
                        if(params.gettoken){
                            res.send({
                                token: jwt.createToken(userFind),
                                user: userFind
                            })
                        }else{
                            return res.send({message: 'Usuario logueado'});
                        }
                    }else{
                        return res.status(403).send({message: 'Usuario o contraseña incorrectos'});
                    }
                })
            }else{
                return res.status(401).send({message: 'Usuario no encontrado'});
            }
        })
    }else{
        return res.status(404).send({message: 'Por favor introduce los campos obligatorios'});
    }
}

//UPDATE
function updateUser(req, res){
    let userId = req.params.idU;
    let update = req.body;

    if(userId != req.user.sub){
        return res.status(401).send({message: 'No tienes permiso para realizar esta acicón'});
    }else{
        if(update.password || update.role){
            return res.status(401).send({message: 'No puedes actualizar la contraseña ni el rol desde esta función'});
        }else{
            if(update.username){
                User.findOne({username: update.username.toLowerCase()}, (err, userFind)=>{
                    if(err){
                        return res.status(500).send({message: 'ERROR GENERAL', err});
                    }else if(userFind){
                        if(userFind._id == req.user.sub){
                            User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated)=>{
                                if(err){
                                    return res.status(500).send({message: 'ERROR GENERAL AL INTENTAR ACTUALIZAR', err});
                                }else if(userUpdated){
                                    return res.send({message: 'Usuario actualizado: ', userUpdated});
                                }else{
                                    return res.send({message: 'No se pudo actualizar tu usuario'})
                                }
                            })
                        }else{
                            return res.send({message: 'Nombre de usuario ya en uso'});
                        }
                    }else{
                        User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
                            if(err){
                                return res.status(500).send({message: 'ERROR GENERAL AL INTENTAR ACTUALIZAR', err});
                            }else if(userUpdated){
                                return res.send({message: 'Usuario actualizado: ', userUpdated});
                            }else{
                                return res.send({message: 'No se pudo actualizar tu usuario'})
                            }
                        })
                    }
                })
            }else{
                User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated)=>{
                    if(err){
                        return res.status(500).send({message: 'ERROR GENERAL AL INTENTAR ACTUALIZAR', err});
                    }else if(userUpdated){
                        return res.send({message: 'Usuario Actualizado: ', userUpdated});
                    }else{
                        return res.send({message: 'No se pudo actualizar tu usuario'});
                    }
                })
            }
        }
    }
}

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
                        user.phone = params.phone;
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
//----DELETE STUDENT
//----SEARCH STUDENT
function searchStudents(req, res){
    var params = req.body;

    if(params.search){
        User.find({$or:[{name: params.search},
                        {lastname: params.search},
                        {username: params.search}]}, (err, resultsSearch)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general'})
                            }else if(resultsSearch){
                                return res.send({resultsSearch})
                            }else{
                                return res.status(404).send({message: 'No hay registros para mostrar'})
                            }
                        })
    }else{
        return res.status(403).send({message: 'Ingresa algún dato en el campo de búsqueda'})
    }
}
//----GET STUDENTS
function getStudents(req, res){
    User.find({}).exec((err, user)=>{
    if(err){
        res.status(500).send({message: 'Error en el servidor'})
    }else if(user){
        res.status(200).send({message: 'Usuarios encontrados', users:user})
    }else{
        res.status(200).send({message: 'No hay registros'})
    }
}) 
}

//--------TEACHER------------

//----SAVE TEACHER
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
                        user.phone = params.phone;
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
//----DELETE TEACHER
//----SEARCH TEACHER
function searchTeachers(req, res){
    var params = req.body;

    if(params.search){
        User.find({$or:[{name: params.search},
                        {lastname: params.search},
                        {username: params.search}]}, (err, resultsSearch)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general'})
                            }else if(resultsSearch){
                                return res.send({resultsSearch})
                            }else{
                                return res.status(404).send({message: 'No hay registros para mostrar'})
                            }
                        })
    }else{
        return res.status(403).send({message: 'Ingresa algún dato en el campo de búsqueda'})
    }
}
//----GET TEACHERS

function getTeachers(req, res){
    User.find({}).exec((err, user)=>{
    if(err){
        res.status(500).send({message: 'Error en el servidor'})
    }else if(user){
        res.status(200).send({message: 'Usuarios encontrados', users:user})
    }else{
        res.status(200).send({message: 'No hay registros'})
    }
}) 
}




module.exports = {
    createInit,
    //STUDENT
    studentSave,
    getStudents,
    //TEACHER
    teacherSave,
<<<<<<< Updated upstream


    login,
    updateUser
}
=======
    login,
    getTeachers,
    searchStudents,
    searchTeachers,
}
>>>>>>> Stashed changes
