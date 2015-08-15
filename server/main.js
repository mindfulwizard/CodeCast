'use strict';
var chalk = require('chalk');

// Requires in ./db/index.js -- which returns a promise that represents
// mongoose establishing a connection to a MongoDB database.
var startDb = require('./db');

// Create a node server instance! cOoL!
var server = require('http').createServer();
var io;

var createApplication = function () {
    var app = require('./app');
    server.on('request', app); // Attach the Express application.
    io = require('./io')(server);   // Attach socket.io.
};


var startServer = function () {


    io.on('connection', function(socket){
        console.log('a user connected')
        socket.on('instructor writing', function (data) {
            console.log('gets it back to the back end bitches')
        })







        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });

    var PORT = process.env.PORT || 1337;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

startDb.then(createApplication).then(startServer).catch(function (err) {
    console.error('Initialization error:', chalk.red(err.message));
    console.error('Process terminating . . .');
    process.kill(1);
});