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

	var codeHistory = {};

	io.on('connection', function(socket) {

		socket.on('updatedText', function (obj) {
			CodeSlice.create(obj)
			.then(function(snippet) {
				console.log('snippet',snippet)
			res.json(snippet);
		})
		})












		//when user joins a room , emit history
		// console.log('user connected');
		// socket.on('join', function(angularStateParamsId) {


		// 	console.log('codeHistory[...]', codeHistory[angularStateParamsId])

		// 	socket.join(angularStateParamsId)

		// 	if (!codeHistory[angularStateParamsId]) {
		// 		codeHistory[angularStateParamsId] = '';
		// 	}
		// 		// socket.emit('codeHistory', codeHistory[angularStateParamsId]);
		// });

		// // socket.on('instructor writing', function(obj) {

		// // 	codeHistory[obj.roomId] = obj.data;
		// // 	var roomToSendTo = obj.roomId
		// // 	socket.broadcast.to(roomToSendTo).emit('change the textSnip', codeHistory[obj.roomId]);
		// // })

		socket.on('leave', function(angularStateParams) {
			socket.leave(angularStateParams.roomId);
		});

		socket.on('disconnect', function() {
			console.log('user disconnected');
		});
	});



	return io;

};