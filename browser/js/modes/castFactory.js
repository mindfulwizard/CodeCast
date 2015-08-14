app.factory('castFactory', function($http){
	return {
		sendText: function(text, time, replayId){
			return $http.post('/api/live', {text: text, time: time, replayId: replayId})
			.then(function(res){
				console.log("res.data: ", res.data);
				return res.data;
			})
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
		}
	}
})