var router = require('express').Router();
var mongoose = require('mongoose');
var Room = mongoose.model('Room');
var User = mongoose.model('User');

router.post('/', function(req, res) {
	Room.create({
		name: req.body.name,
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