// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

var Room = mongoose.model('Room');
var User = mongoose.model('User');


describe('Room Route', function () {

	beforeEach('Establish DB connection', function (done) {
			if (mongoose.connection.db) return done();
			mongoose.connect(dbURI, done);
		});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Requests to /rooms', function () {

		var guestAgent;
		var ins_id;
		var room_id;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);

			var userInfo = {
            	firstName: 'InstructorFirst',
            	lastName: 'InstructorLast',
            	email: 'instructor@gmail.com',
            	instructor: true
           		}

		
			return User.create(userInfo)
				.then(function(user) {
					ins_id = user._id;
					return user;
				})
				.then(function () {
					return Room.create({
		            	name: "RoomTest",
		            	instructor: ins_id,
		            	lectureStarted: false,
		            	lectureEnded: false
		            })
					.then(function(room){
						room_id = room._id;
						return room;
					})
					.then(function () {
						return Room.create({
			            	name: "RoomTestEnded",
			            	instructor: ins_id,
			            	lectureStarted: true,
			            	lectureEnded: true
			            	})
					})
				});
			})

			

		it("should return all lectures that haven't started already", function(done){
			guestAgent.get('/api/rooms/')
			.end(function (err, res){
				if (err) return done(err);
				expect(res.body[0].name).to.equal("RoomTest");
				done();
			})
		})

		it("should return all lectures that started already", function(done){
			guestAgent.get('/api/rooms/lectures')
			.end(function (err, res){
				if (err) return done(err);
				expect(res.body[0].instructor).to.equal(ins_id.toString());
				done();
			})
		})

		it("should return a lecture by id", function(done){
			guestAgent.get('/api/rooms/' + room_id)
			.end(function (err, res){
				if (err) return done(err);
				expect(res.body.name).to.equal("RoomTest");
				done();
			})
		})


		it("should return all the lectures by one instructor", function(done){
			guestAgent.get('/api/rooms/instructor/' + ins_id)
			.end(function (err, res){
				if (err) return done(err);
				expect(res.body[0].lectureStarted).to.equal(false);
				done();
			})
		})

	});


})