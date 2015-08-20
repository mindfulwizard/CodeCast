var router = require('express').Router();
var mongoose = require('mongoose');
require('../../db/models');
var Room = mongoose.model('Room');
var User = mongoose.model('User');
// var uuid = require('node-uuid');

router.post('/', function(req, res) {
	var newRoom = new Room();

	// console.log(req.body);
	//instructor ID ?
	Room.create({
		name: req.body.name,
		// id: uuid.v1().toString()
	})
		.then(function(data) {
			res.send(data);
		});
});

router.get('/', function(req, res) {
	Room.find({lectureEnded: false}).exec()
		.then(function(rooms) {
			res.json(rooms);
		});
});

router.get('/lectures', function(req, res) {
	Room.find({lectureEnded: true}).exec()
		.then(function(rooms) {
			res.json(rooms);
		});
});

router.get('/:id', function(req, res) {
	Room.findById(req.params.id).exec()
		.then(function(room) {
			res.json(room);
		});
});

router.put('/:id', function (req, res) {
	Room.findByIdAndUpdate(req.params.id, req.body).exec()
	.then(function (room) {
		res.json(room);
	});

})

module.exports = router;