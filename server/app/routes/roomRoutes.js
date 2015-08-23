var router = require('express').Router();
var mongoose = require('mongoose');
var Room = mongoose.model('Room');
var User = mongoose.model('User');
var Auth = require('./../configure/auth.middleware.js')

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
	Room.findById(req.params.id).populate('students instructor').exec()
		.then(function(room) {
			res.json(room);
		});
});

// find all the rooms by the instructor who created them
router.get('/instructor/:instructorId', function(req, res) {
	Room.find({instructor: req.params.instructorId, lectureStarted: false}).exec()
		.then(function(room) {
			res.json(room);
		});
});

router.get('/lectures/:instructorId', function(req, res) {
	Room.find({instructor: req.params.instructorId, lectureEnded: true}).exec()
		.then(function(rooms) {
			res.json(rooms);
		});
});

router.put('/:id', function (req, res) {
	Room.findByIdAndUpdate(req.params.id, req.body).exec()
	.then(function (room) {
		res.json(room);
	});
})

//Auth authentication here
router.use('/', Auth.isAuthenticated, function(req, res, next) {
	if (req.user.instructor) next();
	else Auth.isAdmin(req, res, next);
});

router.post('/', function(req, res) {
	console.log('passed auth')
	Room.create({
		name: req.body.name,
		instructor: req.body.instructor
	})
		.then(function(room) {
			console.log('room created?', room)
			res.send(room);
		});
});

module.exports = router;