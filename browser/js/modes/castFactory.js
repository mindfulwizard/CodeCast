app.factory('castFactory', function($http, socketFactory){
	return {

		sendText: function (text, time, roomId) {
			socketFactory.emit('updatedText', {text: text, time: time, room: roomId})

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
		},
		saveUserFork: function(forkedText, replayId){
			return $http.post('/api/forks/'+ replayId, {text: forkedText, replayId: replayId})
			.then(function(res){
				return res.data;
			})
		}
	}
})