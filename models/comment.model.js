'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = Schema({
    title: String,
    comm: String,
    link: String,
})
module.exports = mongoose.model('comment', commentSchema);