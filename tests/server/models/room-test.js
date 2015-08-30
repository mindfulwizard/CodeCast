var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Room = mongoose.model('Room');
var User = mongoose.model('User');

describe('Room model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });


    describe('on creation', function () {
        var createInstructor = function (){
            return User.create({
            	firstName: 'InstructorFirst',
            	lastName: 'InstructorLast',
            	email: 'instructor@gmail.com' ,
            	instructor: true
            });
        }

        var createRoom = function (id) {
            return Room.create({
            	name: "RoomTest",
            	instructor: id,
            	lectureStarted: true,
            	lectureEnded: false
             });
        };

        it('should create a Room model in database', function(done){
            createInstructor().then(function(){
                User.findOne({firstName: 'InstructorFirst'}).exec()
                .then(function (instructor){
                    createRoom(instructor._id)
                    .then(function(){
                        Room.findOne({lectureStarted: true}).exec()
                        .then(function (room) {
                            expect(room.name).to.be("RoomTest");
                        })
                        done();
                    })
                    
                })
            })
        })

    });

});