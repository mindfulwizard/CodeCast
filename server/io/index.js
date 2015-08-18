'use strict';
var socketio = require('socket.io');
// var uuid = require('node-uuid');
var io = null;
var mongoose = require('mongoose');
require('../db/models');
var CodeSlice = mongoose.model('CodeSlice');
var CodeReplay = mongoose.model('CodeReplay');


module.exports = function(server) {
	var rooms = {};

	if (io) return io;
	io = socketio(server);

	// keep track of codeHistory of each room
	var codeHistory = {};

	io.on('connection', function(socket) {

		// on key press, create new snippet and update codeHistory
		socket.on('updatedText', function(obj) {
			CodeSlice.create(obj)
				.then(function(snippetObj) {

					var roomToSendTo = snippetObj.room.toString();

					// update codeHistory
					codeHistory[snippetObj.room] = snippetObj.text;
					console.log('Snippet OBJ', snippetObj);
					// once new snippet created, emit to the specific room
					socket.broadcast.to(roomToSendTo).emit('change the textSnip', snippetObj.text);

				})
			// console.log(socket, "SOCKET");
		})

		socket.on('join', function(roomId) {
			console.log("USER HAS ARRIVED");
			socket.emit('get code history', codeHistory[roomId]);
			io.to(roomId).emit('get code history', codeHistory[roomId]);
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