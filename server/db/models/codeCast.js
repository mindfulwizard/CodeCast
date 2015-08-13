'use strict';
var mongoose = require('mongoose');

var codeCast = new mongoose.Schema({
    author: {
        type: Number
    }
});



mongoose.model('CodeCast', codeCast);