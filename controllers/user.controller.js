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

//--------STUDENT------------

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