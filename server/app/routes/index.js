'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/live', require('./liveRoutes'));
router.use('/replay', require('./replayRoutes'));
router.use('/forks', require('./forkRoutes'));
router.use('/members', require('./members'));
router.use('/rooms', require('./roomRoutes'));
router.use('/comments', require('./commentsRoutes'));
// Make sure this is after all of
// the registered routes!
router.use(function(req, res) {
	res.status(404).end();
});