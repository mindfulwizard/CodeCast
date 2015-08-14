var router = require('express').Router();
var mongoose = require('mongoose');
require('../../db/models');
var CodeSlice = mongoose.model('CodeSlice');
var CodeReplay = mongoose.model('CodeReplay'); 

router.get('/', function(req, res){
	CodeReplay.find({})
	.then(function(replays){
		res.json(replays);
	})
})

router.get('/:id', function(req, res){
	CodeSlice.find({replayId: req.params.id})
	.then(function(codeSlices){
		res.json(codeSlices);
	})
})

module.exports = router;