var router = require('express').Router();
var mongoose = require('mongoose');
var CodeSlice = mongoose.model('CodeSlice');

router.post('/', function(req, res) {
	CodeSlice.create(req.body)
		.then(function(snippet) {
			res.json(snippet);
		})
})

router.get('/', function(req, res) {
	CodeSlice.find({})
		.then(function(codeSlices) {
			res.json(codeSlices);
		})
})

router.get('/newReplay', function(req, res) {
	CodeReplay.create({})
		.then(function(codeReplay) {
			res.json(codeReplay);
		})
})

module.exports = router;