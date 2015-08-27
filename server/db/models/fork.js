'use strict';
var mongoose = require('mongoose');

var Fork = new mongoose.Schema({
	name: {
		type: String
	},
    text: {
        type: String
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});



mongoose.model('Fork', Fork);