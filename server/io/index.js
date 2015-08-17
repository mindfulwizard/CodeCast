'use strict';
var socketio = require('socket.io');
var uuid = require('node-uuid');
var io = null;

module.exports = function(server) {
	var rooms = {};

	if (io) return io;
	io = socketio(server);

	var codeHistory = {};

	io.on('connection', function(socket) {
		//when user joins a room , emit history
		console.log('user connected');
		socket.on('join', function(angularStateParamsId) {
			console.log('angularStateParams', angularStateParamsId)
			socket.join(angularStateParamsId)
			if (!codeHistory[angularStateParamsId]) {
				codeHistory[angularStateParamsId] = [];
			}
			socket.emit('codeHistory', codeHistory[angularStateParamsId]);
			console.log(codeHistory[angularStateParamsId]);
		});

		socket.on('instructor writing', function(obj) {

			codeHistory[obj.roomId].push(obj.data);
			console.log('obj', obj)
			var roomToSendTo = obj.roomId
			socket.broadcast.to(roomToSendTo).emit('change the textSnip', obj);
		})

		socket.on('leave', function(angularStateParams) {
			socket.leave(angularStateParams.roomId);
		});

		socket.on('disconnect', function() {
			console.log('user disconnected');
		});
	});

	return io;

};