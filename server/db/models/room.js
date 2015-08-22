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
	},
	textHistory: String,
	resultHistory: String,
	// change this to be array of objects when we work on user permissions
	commentHistory: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}]
});

mongoose.model('Room', room);