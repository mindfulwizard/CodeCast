app.factory('audioFactory', function($http){
	return {
		sendBuffer: function (roomId, url) {
			return $http.put('/api/rooms/audio/' + roomId, {audioUrl: url})
			.then(function (res) {
				return res.data
			})
		}
	}
})