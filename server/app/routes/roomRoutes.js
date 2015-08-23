var router = require('express').Router();
var mongoose = require('mongoose');
var fs = require('fs');
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


router.put('/audio/:id', function(req, res) {
	fs.writeFile("AudioFiles/" +req.params.id+'.wav', JSON.stringify(req.body), 'utf-8', function (err) {
 	if (err) throw err;
 	console.log("file written")
	Room.findByIdAndUpdate(req.params.id, {audioFileLink: "AudioFiles/" + req.params.id+'.wav'}).exec()
	.then(function (room) {
		res.end();	
	})
 	})
});


router.get('/audio/:id', function(req, res) {
	Room.findById(req.params.id).exec()
	.then(function (room) {
		fs.readFile(room.audioFileLink, function (err, data) {
		  if (err) throw err;
		  res.json(JSON.parse(data));
		})
	})
});

module.exports = router;