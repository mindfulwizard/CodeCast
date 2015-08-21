'use strict';
var socketio = require('socket.io');
// var uuid = require('node-uuid');
var io = null;
var mongoose = require('mongoose');
require('../db/models');
var CodeSlice = mongoose.model('CodeSlice');
var Comment = mongoose.model('Comment');
var Room = mongoose.model('Room');

module.exports = function(server) {
	// var rooms = {};

	if (io) return io;
	io = socketio(server);

	// // keep track of codeHistory of each room
	// var History = {};
	// // keep track of codeHistory of each room
	 var commentHistory = {};

	io.on('connection', function(socket) {

		// on key press, create new snippet and update codeHistory
		socket.on('updatedText', function(obj) {
			var snippet = obj;
			var roomToSendTo = obj.room.toString();
			// update codeHistory
			//codeHistory[obj.room] = obj;
			// emit to the specific room
			socket.broadcast.to(roomToSendTo).emit('change the textSnip', obj);
			Room.findByIdAndUpdate(obj.room, {textHistory: obj.text, resultHistory: obj.result}).exec()
			.then(function(){
				// store the obj in db
				CodeSlice.create(snippet)
			})
		})

		// initiliaze comment
		socket.on('initiliaze comments', function(obj) {
			commentHistory[obj.roomId] = [];
		})


		// when user posts a comment/quesion, create new comment
		socket.on('send a comment', function (obj) {
			Comment.create(obj)
			.then(function (commentObj) {
				var roomToSendTo = commentObj.room.toString();
				if (!commentHistory[commentObj.room]) {
					commentHistory[commentObj.room] = [];
				}
					// add the userId to the obj when we add permissions/auth
					commentHistory[commentObj.room].push({text: commentObj.text, commentId: commentObj._id})
				// send comment to specific room
				io.to(roomToSendTo).emit('receive comment', commentObj)
			})
		})

		socket.on('join', function(roomId) {
			console.log("USER HAS ARRIVED");
			 socket.emit('get comments history', commentHistory[roomId])
			 io.to(roomId).emit('get comments history', commentHistory[roomId]);
			socket.join(roomId);
		})


		socket.on('leave', function(roomId) {
			console.log("USER HAS LEFT");
			socket.leave(roomId);
		});

		socket.on('disconnect', function() {
			console.log('user disconnected');
		});
	});



	return io;

};