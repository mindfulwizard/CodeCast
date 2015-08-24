app.factory('audioFactory', function($http){
	return {
		sendBuffer: function (roomId, link) {
			return $http.put('/api/rooms/audio/' + roomId, {audioFileLink: link})
			.then(function (res) {
				return res.data
			})
		},
		getBuffer:  function(roomId){
			return $http.get('/api/rooms/audio/' + roomId)
			.then(function(res){
				return res.data.audioFileLink
			})
		}
	}
})