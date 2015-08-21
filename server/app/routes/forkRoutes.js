var router = require('express').Router();
var mongoose = require('mongoose');
var Fork = mongoose.model('Fork');

router.get('/:replayId', function(req, res){
	Fork.find({replayId: req.params.replayId})
	.then(function(fork){
		res.json(fork);
	})
})


router.post('/:replayId', function(req, res){
	Fork.create({name: req.body.name, text: req.body.text, replayId: req.params.replayId})
	.then(function(fork){
		res.json(fork);
	})
})

module.exports = router;