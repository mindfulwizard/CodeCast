'use strict';
var socketio = require('socket.io');
var uuid = require('node-uuid');
var io = null;

module.exports = function(server) {
	var rooms = {};

	if (io) return io;
	io = socketio(server);


	function Room(name) {
		this.name = name;
		this.id = uuid.v1().toString();
	}

	function createRoom(name) {
		var newRoom = new Room(name)
		rooms[newRoom.id] = newRoom.name;
		console.log(rooms);
	}


	// client.on('ready', function(f) {
	// 	createRoom();


	// });

	io.on('connection', function(socket) {

		socket.on('createRoom', function(obj) {
			createRoom(obj.name);
			socket.emit('give room to front-end', rooms);
		})


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