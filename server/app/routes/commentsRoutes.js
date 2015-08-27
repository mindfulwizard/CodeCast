var router = require('express').Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

router.get('/', function(req, res) {
	Comment.find({}).populate('user').exec()
		.then(function(comments) {
			res.json(comments);
		});
});

module.exports = router;