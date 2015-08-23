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
	 // var commentHistory = {};

	io.on('connection', function(socket) {

		// on key press, create new snippet and update codeHistory
		socket.on('updatedText', function(obj) {
			var snippet = obj;
			var roomToSendTo = obj.room.toString();
			// emit to the specific room
			socket.broadcast.to(roomToSendTo).emit('change the textSnip', obj);
			// update History
			Room.findByIdAndUpdate(obj.room, {textHistory: obj.text, resultHistory: obj.result}).exec()
			.then(function(){
				// store the obj in db
				CodeSlice.create(snippet)
			})
		})

		// // initiliaze comment
		// socket.on('initiliaze comments', function(obj) {
		// 	commentHistory[obj.roomId] = [];
		// })


		// when user posts a comment/quesion, create new comment
		socket.on('send a comment', function (obj) {
			var commentObj = obj;
			var roomToSendTo = obj.room.toString();
			// update comment History
			// add user parameter when work on user permissions
			Room.findById(obj.room).exec()
			.then(function (room) {
				room.commentHistory.push(commentObj.text);
				room.save()
				// send comment to specific room including the sender
				io.to(roomToSendTo).emit('receive comment', room.commentHistory)
				return room;
			})
			.then(function(room){
				// store the comment in db
				Comment.create(commentObj)
			})

			// Comment.create(obj)
			// .then(function (commentObj) {
			// 	var roomToSendTo = commentObj.room.toString();
			// 	if (!commentHistory[commentObj.room]) {
			// 		commentHistory[commentObj.room] = [];
			// 	}
			// 		// add the userId to the obj when we add permissions/auth
			// 		commentHistory[commentObj.room].push({text: commentObj.text, commentId: commentObj._id})
			// 	// send comment to specific room
			// 	io.to(roomToSendTo).emit('receive comment', commentObj)
			// })
		})

		socket.on('join', function(objReceived) {
			console.log("USER HAS ARRIVED");
			var newUser = objReceived.user;
			socket.join(objReceived.room);
			// update the list of students in room
			Room.findById(objReceived.room).exec()
			.then(function (room) {
				console.log()
				if ((room.students.indexOf(newUser._id) === -1) && (room.students.indexOf(newUser._id) !== objReceived.instructor)){
					room.students.push(newUser._id)
					console.log('room after user enters if statement', room)
				}
				room.save()
				console.log('room after user enters', room)
				return room;
			})
		})


		socket.on('leave', function(objReceived) {
			console.log("USER HAS LEFT");
			var newUser = objReceived.user;
			socket.leave(objReceived.room);
			// remove student from list in room
			Room.findById(objReceived.room).exec()
			.then(function (room) {
				room.students.splice(room.students.indexOf(newUser._id), 1)
				room.save()
				console.log('room after user leave', room)
				return room;
			})
		});

		socket.on('disconnect', function() {
			console.log('user disconnected');
		});
	});



	return io;

};