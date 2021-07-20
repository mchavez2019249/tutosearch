'use strict'

var User = require('../models/user.model');
var Class = require('../models/class.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

//SAVE
function saveClass (req, res){
    let userId = req.params.id;  
    var clas = new Class();
    var params = req.body;
    if(userId !=req.user.sub){
        res.status(403).send({message: 'No puede acceder a esta funcion'})
    }else{
        if(params.name && params.description){
            Class.findOne({name: params.name}, (err, classFind)=>{
                if(err){
                    res.status(500).send({message: 'ERROR GENERAL', err})
                }else if(classFind){
                    res.status(200).send({message: 'La materia ya fue asignada'})
                }else{                       
                    User.findOne({_id: userId}, (err, userFind)=>{
                        if(err){
                            res.status(500).send({message:'ERROR GENERAL', err})
                        }else if(userFind){
                            if (userFind.role == 'ROLE_TEACHER') {
                                clas.name = params.name;
                                clas.description = params.description;
                                clas.teacher =  userId;                                      
                                clas.save((err, classSaved)=>{
                                
                           if(err){
                                res.status(500).send({message: 'ERROR GENERAL', err})
                            }else if(classSaved){    
                                User.findById(userId, (err, userFind)=>{
                                    if(err){
                                        res.status(500).send({message: 'ERROR GENERAL', err})
                                    }else if(userFind){
                                        res.status(200).send({message: 'Materia registrada con éxito', savedC: classSaved, userFind}) 
                                      
                                    }else{
                                        res.status(401).send({message: 'No se pudo registrar la materia'})
                                    }
                                })
                            }else{
                                res.status(401).send({message: 'No se pudo registrar la materia'})
                                }
                               })                      
                                }else{
                                res.status(401).send({message: 'No tiene autorización para registrar una materia'})
                                }

                        }else{
                            res.status(500).send({message:'Usuario no encontrado'})
                        }
                    })  
                }
            })
        }else{
            res.status(401).send({message: 'Ingrese los datos minimos para el registro de la materia'})
        }
    }
}

//UPDATE
function updateClass(req, res){
    let userId = req.params.idU;
    let classId = req.params.idC;
    let update = req.body;
    if(userId != req.user.sub){
        return res.status(404).send({message: 'No tienes permiso para realizar esta acción'});
    }else{
        if(update.name){
            User.findById(userId, (err, userFind)=>{
                if(err){
                    return res.status(500).send({message: 'ERROR GENERAL', err});
                }else if(userFind){
                    Class.findById(classId,(err, classFind)=>{
                        if (err) {
                            return res.status(500).send({message: 'ERROR GENERAL AL ACTUALIZAR LA MATERIA'});
                        }else if (classFind) {
                            if (classFind.admin == userId || userFind.role == 'ROLE_TEACHER') {
                                Class.findByIdAndUpdate(classId, update, {new: true}, (err, updateClass)=>{
                                    if(err){
                                        return res.status(500).send({message: 'ERROR GENERAL AL ACTUALIZAR LA MATERIA'});
                                    }else if(updateClass){
                                        return res.send({message: 'Materia actualizada con éxito', updateClass});
                                    }else{
                                        return res.status(401).send({message: 'No se pudo actualizar la materia'});
                                    }
                                })
                            }else{
                                return res.status(401).send({message: 'No tiene autorización para actualizar esta materia'});
                            }
                        }else{
                            return res.status(401).send({message: 'No se pudo encontrar la materia solicitada'});
                        }
                    })
                   
                }else{
                    return res.status(404).send({message: 'Usuario inexistente'});
                }
            }) 
        }else{
            return res.status(404).send({message: 'Por favor ingresa los datos mínimos para actualizar la materia'});
        }       
    }
}


//DELETE
function deleteClass(req, res){
    let teacherId = req.params.idT;
    let classId = req.params.idC;
    let params = req.body;
    if(teacherId !=req.user.sub){
        return res.status(403).send({message: 'No tienes permisos para realizar esta acción'})
    }else{
        Class.findById(classId, (err, classFind)=>{
            if(err){
                res.status(500).send({message: 'ERROR GENERAL', err});
            }else if(classFind){
                if(classFind.teacher == teacherId){
                    Class.findByIdAndRemove(classId, (err, classRemoved)=>{
                        if(err){
                            res.status(500).send({message: 'ERROR GENERAL', err});
                        }else if(classRemoved){
                            res.status(200).send({message: 'Clase eliminada correctamente'});
                        }else{
                            res.status(403).send({message: 'no se eliminó la clase'});
                        }
                    }) 
                }else{
                    res.status(403).send({message: 'No puede editar esta clase'});
                }
            }else{
                res.status(403).send({message: 'No se encontró la clase'});
            }
        }) 
    }
}


    module.exports = {
        saveClass,
        deleteClass,
        updateClass
    }
    