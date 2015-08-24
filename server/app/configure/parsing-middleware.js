'use strict';
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var busboy = require('connect-busboy');

module.exports = function (app) {

    // Important to have this before any session middleware
    // because what is a session without a cookie?
    // No session at all.
    app.use(cookieParser());

    // Parse our POST and PUT bodies.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
 //    app.use(busboy())
 //    app.use(function(req, res, next) {
	//   if (req.busboy) {
	//   	console.log('busboy is defined')
	//     req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
	//     	console.log('file event')
	//       req.files = req.files || [];
	//       req.files.push(file)
	// 	  next()
	//     });
	//     req.pipe(req.busboy);
	//   } else { next(); }
	//   // etc ...
	// });
	// app.use(function(req, res, next) {
	// 	console.log('we get to the next middleware')
	// 	next()
	// })
};