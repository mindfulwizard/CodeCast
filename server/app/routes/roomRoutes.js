var router = require('express').Router();
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path')
require('../../db/models');
var Room = mongoose.model('Room');
var User = mongoose.model('User');
var multer = require('multer')
var upload = multer({ dest: 'audio/' })
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


router.put('/audio/:id', upload.single('data'), function(req, res, next) {
	console.log('we get past multer middleware')
	console.log(req.file)
	next()
}, function(req, res,next) {
	Room.findByIdAndUpdate(req.params.id, {audioFileLink: req.file.path}).exec()
	.then(function (room) {
		res.end();	
	})
	.then(null,next)
});


router.get('/audio/:id', function(req, res) {
	Room.findById(req.params.id).exec()
	.then(function (room) {
		console.log(process.cwd())
		res.set('Content-Type', 'audio/wav')
		res.sendFile(path.join(process.cwd(),room.audioFileLink))
	})
});

module.exports = router;