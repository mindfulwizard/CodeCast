'use strict';
var socketio = require('socket.io');
var io = null;
var mongoose = require('mongoose');
require('../db/models');
var CodeSlice = mongoose.model('CodeSlice');
var Comment = mongoose.model('Comment');
var Room = mongoose.model('Room');

module.exports = function(server) {

	if (io) return io;
	io = socketio(server);

	io.on('connection', function(socket) {

		var info;

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

		// when user posts a comment/quesion, create new comment
		socket.on('send a comment', function (obj) {
			var commentObj = obj;
			var roomToSendTo = obj.room.toString();
			// create a comment instance and update comment History on room
			Comment.create(commentObj)
			.then(function(comment){
				Room.findById(commentObj.room).populate('commentHistory').exec()
				.then(function (room) {
					room.commentHistory.unshift(comment);
					room.save()
					.then(function(room) {
						Room.findById(room._id).deepPopulate('commentHistory commentHistory.user').exec()
						.then(function (room) {
							// send comment to specific room including the sender
							io.to(roomToSendTo).emit('receive comment', room);
							return room;
						})
							
						})
					})
			})
		})

		// create a modal when closing room
		socket.on('send a closing modal', function (obj) {
			var roomToSendTo = obj.room.toString();
			socket.broadcast.to(roomToSendTo).emit('send the close modal', obj);
		})

		socket.on('select one user', function(object){
			var roomToSendTo = object.roomId.toString();
			io.to(roomToSendTo).emit('toggling editing permission to student', {userId: object.userId})
		})

		var info;

		socket.on('join', function(objReceived) {
			info = objReceived;
			console.log("USER HAS JOINED");
			var newUser = objReceived.user;
			// update the list of students in room
			Room.findById(objReceived.room).populate('students instructor commentHistory').exec()
			.then(function (room) {
				var push = true;
				// if (newUser.instructor === true) {
				// 	push = false;
				// }
				room.students.forEach(function (studentObj) {
						if ( ((studentObj._id).toString() === (newUser._id).toString())) {
						push = false;
					}
				})
				if (push) {
					room.students.push(newUser)
				}
				room.save()
				socket.join(objReceived.room);
				io.in(room._id).emit('add to room.students', room);
				return room;
			})
		})


		socket.on('leave', function(objReceived) {
			console.log("USER HAS LEFT");
			var newUser = objReceived.user;
			// remove student from list in room
			socket.leave(objReceived.room);
			Room.findById(objReceived.room).populate('students instructor commentHistory').exec()
			.then(function (room) {
				room.students.forEach(function (studentObj, index) {
					if ((newUser._id).toString() === (studentObj._id).toString()) {
						room.students.splice(room.students.indexOf(studentObj), 1)
					}
				})
				room.save()
				io.to(room._id).emit('delete from room.students', room);
				// to toggle permissions off when user disconnects
				io.to(room._id).emit('selected user disconnected', room)
				return room;
			})
		});

		socket.on('disconnect', function() {
			console.log('user disconnected');
			if (info && info.user) {
				socket.leave(info.room);
				var user = info.user;
				Room.findById(info.room).populate('students instructor commentHistory').exec()
				.then(function (room) {
					room.students.forEach(function (studentObj, index) {
						if ((user._id).toString() === (studentObj._id).toString()) {
							room.students.splice(room.students.indexOf(studentObj), 1)
					}
				})
				room.save()
				io.to(room._id).emit('delete from room.students', room);
				// to toggle permissions off when user disconnects
				io.to(room._id).emit('selected user disconnected', room)
				return room;
				});
			}
		});
	});


	return io;

};