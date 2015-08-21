'use strict'
var mongoose = require('mongoose');

var room = new mongoose.Schema({
	name: String,
	students: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	lectureStarted: {
		type: Boolean,
		default: false
	},
	lectureEnded: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Room', room);