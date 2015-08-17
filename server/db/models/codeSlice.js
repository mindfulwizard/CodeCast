'use strict';
var mongoose = require('mongoose');

var CodeSlice = new mongoose.Schema({
    text: {
        type: String
    },
    time: {
        type: Date
    },
    replayId: {
    	type: String
    },
    evaluated: {
    	type: Boolean,
        default: false
    }
});



mongoose.model('CodeSlice', CodeSlice);