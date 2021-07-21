'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var classSchema = Schema({
    name: String,
    description: String,
    teacher: {type: Schema.ObjectId, ref: 'user'},
    student: [{type: Schema.ObjectId, ref: 'user'}],
    comments: [{
        title: String,
        comm: String,
        link: String
    }]
})
module.exports = mongoose.model('class', classSchema);
