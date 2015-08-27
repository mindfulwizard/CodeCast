var router = require('express').Router();
var mongoose = require('mongoose');
var Fork = mongoose.model('Fork');

router.get('/', function(req, res){
	Fork.find({user: req.user._id})
	.then(function(fork){
		res.json(fork);
	})
})

router.get('/:roomId', function(req, res){
	Fork.find({roomId: req.params.roomId, user: req.user._id})
	.then(function(fork){
		res.json(fork);
	})
})


router.post('/:roomId', function(req, res){
	Fork.create({name: req.body.name, user: req.user._id, text: req.body.text, roomId: req.params.roomId})
	.then(function(fork){
		res.json(fork);
	})
})

module.exports = router;