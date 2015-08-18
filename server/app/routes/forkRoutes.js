var router = require('express').Router();
var mongoose = require('mongoose');
require('../../db/models');
var Fork = mongoose.model('Fork');


router.post('/:replayId', function(req, res){
	Fork.create({text: req.body.text, replayId: req.params.replayId})
	.then(function(fork){
		res.json(fork);
	})
})

module.exports = router;