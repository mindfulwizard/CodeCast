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
    }
});



mongoose.model('CodeSlice', CodeSlice);