'use strict';
var mongoose = require('mongoose');
var socket = require('../../io')
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
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room'
	}
});

CodeSlice.pre('save', function(next) {
	if (!this.isNew) next();
	// emit a socket event
	io.to(this.room).emit('CodeSlice:create', this)
})



mongoose.model('CodeSlice', CodeSlice);