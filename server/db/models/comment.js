'use strict';
var mongoose = require('mongoose');

var Comment = new mongoose.Schema({
    text: {
        type: String
    },
    room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room'
	},
    user: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
    },
    time: {
        type: Date
    }
});



mongoose.model('Comment', Comment);