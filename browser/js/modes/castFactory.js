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
		sendText: function (text, time, replayId, roomId) {
			socketFactory.emit('updatedText', {text: text, time: time, replayId: replayId, room: roomId})
		},

		createReplay: function(){
			return $http.get('/api/live/newReplay')
			.then(function(res){
				return res.data._id;
			})
		},

		getReplays: function(){
			return $http.get('api/replay')
			.then(function(res){
				return res.data;
			})
		},

		getCast: function(replayId){
			return $http.get('/api/replay/' + replayId)
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
		saveUserFork: function(forkName, forkedText, replayId){
			return $http.post('/api/forks/'+ replayId, {name: forkName, text: forkedText, replayId: replayId})
			.then(function(res){
				return res.data;
			})
		},
		getUserForks: function(replayId){
			return $http.get('/api/forks/'+ replayId)
			.then(function(res){
				return res.data
			})
		}
	}
})