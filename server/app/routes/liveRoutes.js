var router = require('express').Router();
var mongoose = require('mongoose');
require('../../db/models');
var CodeSlice = mongoose.model('CodeSlice');
var CodeReplay = mongoose.model('CodeReplay'); 


router.post('/', function(req, res) {
	CodeSlice.create({
		text: req.body.text,
		time: req.body.time,
		replayId: req.body.replayId
	})
	.then(function(snippet){
		res.json(snippet);
	})
})

router.get('/', function(req, res){
	CodeSlice.find({})
	.then(function(codeSlices){
		res.json(codeSlices);
	})
})

router.get('/newReplay', function(req, res){
	CodeReplay.create({})
	.then(function(codeReplay){
		res.json(codeReplay);
	})
})

module.exports = router;