var router = require('express').Router();
var mongoose = require('mongoose');
require('../../db/models');
var Comment = mongoose.model('Comment');

router.get('/', function(req, res) {
	Comment.find({}).exec()
		.then(function(comments) {
			res.json(comments);
		});
});

module.exports = router;