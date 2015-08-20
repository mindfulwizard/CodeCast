app.factory('castFactory', function($http, socketFactory){
	return {

		sendText: function (text, time, roomId) {
			socketFactory.emit('updatedText', {text: text, time: time, room: roomId})

		},

		// add userId as parameter when we work on permissions
		sendComment: function (text, roomId) {
			socketFactory.emit('send a comment', {text: text, room: roomId})
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