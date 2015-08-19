var router = require('express').Router();
var mongoose = require('mongoose');
require('../../db/models');
var CodeSlice = mongoose.model('CodeSlice');

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

router.put('/:id', function(req, res){
	CodeSlice.findOne({replayId: req.params.id, time: {$gte: req.body.time}}).exec()
	.then(function(codeSlice){
		codeSlice.evaluated = true;
		return codeSlice.save()
	})
	.then(function(updated){
		res.json(updated);
	})
	.then(null, function(err){
		console.log("Error ", err);
	})
})

module.exports = router;