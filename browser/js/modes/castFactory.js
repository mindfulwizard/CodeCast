app.factory('castFactory', function($http, socketFactory){
	return {

		defineRoomId: function(roomId) {
			return roomId;
		},

		sendText: function (text, time, roomId, result) {
				socketFactory.emit('updatedText', {text: text || null, time: time, room: roomId, result: result})

		},

		becomeInstructor: function (user) {
			return $http.put('api/members/' + user._id, {instructor: true})
			.then(function (res){
				return res.data;
			})
		},

		sendComment: function (text, userId, roomId) {
			socketFactory.emit('send a comment', {text: text, user: userId, room: roomId, time: new Date() })
		},

		sendModal: function (roomId) {
			socketFactory.emit('send a closing modal', {room: roomId})
		},

		endLecture: function (roomId) {
			return $http.put('/api/rooms/' + roomId, {lectureEnded: true})
			.then(function (res) {
				return res.data
			})
		},

		startLecture: function (roomId) {
			return $http.put('/api/rooms/' + roomId, {lectureStarted: true})
			.then(function (res) {
				return res.data
			})
		},
		getAllLive: function(){
			return $http.get('api/rooms')
			.then(function(res){
				return res.data
			})
		},
		getAllReplays: function(){
			return $http.get('api/rooms/lectures')
			.then(function(res){
				return res.data
			})
		},
		getCast: function(roomId){
			return $http.get('/api/replay/' + roomId)
			.then(function(res){
				return res.data;
			})
		},

		addEvalClick: function(time, replayId){
			return $http.put('/api/replay/' + replayId, {time: time, replayId: replayId})
			.then(function(res){
				return res.data;
			})
		}
	}
})