'use strict';
var mongoose = require('mongoose');

var Fork = new mongoose.Schema({
    text: {
        type: String
    },
    replayId: {
    	type: String
    },
    userId: {
        type: String
    }
});



mongoose.model('Fork', Fork);