'use strict';
var mongoose = require('mongoose');
var CodeSlice = new mongoose.Schema({
	text: {
		type: String
	},
	time: {
		type: Date
	},
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room'
	},
	result: {
		type: String
	}
});

mongoose.model('CodeSlice', CodeSlice);