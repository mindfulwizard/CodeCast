var router = require('express').Router();
var mongoose = require('mongoose');
var CodeSlice = mongoose.model('CodeSlice');

router.get('/', function(req, res){
	CodeReplay.find({})
	.then(function(replays){
		res.json(replays);
	})
})

router.get('/:roomId', function(req, res){
	CodeSlice.find({room: req.params.roomId})
	.then(function(codeSlices){
		res.json(codeSlices);
	})
})

module.exports = router;