app.factory('castFactory', function($http, socketFactory){
	return {
			// changed this function to sockets
		// sendText: function(text, time, replayId){
		// 	return $http.post('/api/live', {text: text, time: time, replayId: replayId})
		// 	.then(function(res){
		// 		// console.log("res.data: ", res.data);
		// 		return res.data;
		// 	})
		// },

		// on keydown, create socket event to create new snippet
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

		// createReplay: function(){
		// 	return $http.get('/api/live/newReplay')
		// 	.then(function(res){
		// 		return res.data._id;
		// 	})
		// },

		// getReplays: function(){
		// 	return $http.get('api/replay')
		// 	.then(function(res){
		// 		return res.data;
		// 	})
		// },

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