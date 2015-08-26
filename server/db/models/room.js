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
	commentHistory: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}]
});

//allows deep population //see github docs for usage
var deepPopulate = require('mongoose-deep-populate')(mongoose);
room.plugin(deepPopulate, {});

mongoose.model('Room', room);