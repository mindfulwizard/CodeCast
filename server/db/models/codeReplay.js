'use strict';
var mongoose = require('mongoose');

var codeReplay = new mongoose.Schema({
    author: {
        type: Number
    }
});



mongoose.model('CodeReplay', codeReplay);