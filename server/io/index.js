'use strict';
var socketio = require('socket.io');
var uuid = require('node-uuid');
var io = null;

module.exports = function(server) {
	var rooms = {};

	if (io) return io;
	io = socketio(server);



	io.on('connection', function(socket) {

		socket.on('join', function(angularStateParamsId) {
			console.log('angularStateParams', angularStateParamsId)
			socket.join(angularStateParamsId)
		});

		socket.on('instructor writing', function(obj) {
			console.log('obj', obj)
			var roomToSendTo = obj.roomId
			socket.broadcast.to(roomToSendTo).emit('change the textSnip', obj)
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