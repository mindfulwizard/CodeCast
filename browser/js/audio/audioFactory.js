app.factory('audioFactory', function($http){
	return {
		sendBuffer: function (roomId, audioFileObj) {
			return $http.put('/api/rooms/audio/' + roomId, {audioFileObj: audioFileObj})
			.then(function (res) {
				return res.data
			})
		},
		getBuffer:  function(roomId){
			return $http.get('/api/rooms/audio/' + roomId)
			.then(function(res){
				return res.data
			})
		}
	}
})