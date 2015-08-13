var router = require('express').Router();
var mongoose = require('mongoose');
require('../../db/models');
var CodeSlice = mongoose.model('CodeSlice');
var CodeCast = mongoose.model('CodeCast'); 


router.post('/', function(req, res) {
	CodeSlice.create({
		text: req.body.text,
		time: req.body.time
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

module.exports = router;