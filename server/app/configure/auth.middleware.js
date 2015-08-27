'use strict';

var User = require('../../db/models/user.js');

var Auth = {};

Auth.isAuthenticated = function (req, res, next) {
	if (req.user) next();
	else {
		throw "You are not authenticated";
		next()
	};
};

Auth.isInstructor = function (req,res,next) {
	if (req.user && req.user.instructor) next();
	else {
		throw "You are not an instructor";
		next()
	}
}

Auth.isAdmin = function (req, res, next, err) {
	if (req.user && req.user.admin) next();
	else{
		throw "You are not an admin!";
		next();
	};
}

module.exports = Auth;