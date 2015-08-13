'use strict';
var mongoose = require('mongoose');

var codeCast = new mongoose.Schema({
    codeStream: {
      	type: mongoose.Schema.Types.ObjectId,
        ref: 'codeSlice'
    },
    author: {
        type: String
    }
});



mongoose.model('CodeCast', codeCast);