'use strict'

var User = require('../models/user.model');
var Class = require('../models/class.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

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

    module.exports = {
        saveClass
    }
    