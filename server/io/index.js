'use strict';
var socketio = require('socket.io');
var uuid = require('node-uuid');
var io = null;

module.exports = function(server) {
	var rooms = {},

		if (io) return io;
	io = socketio(server);


	function Room(name) {
		this.id = uuid.v4().toString();
		this.players = [{
			name: user1.name,
			id: user1.id
		}, {
			name: user2.name,
			id: user2.id
			// img: user2.img
		}];
	}
	io.on('connection', function(socket) {

		console.log('a user connected')
		socket.on('instructor writing', function(data) {
			socket.broadcast.emit('change the textSnip', data)
		})
		socket.on('disconnect', function() {
			console.log('user disconnected');
		});
	});

	return io;

};