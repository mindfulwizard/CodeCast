
app.factory('audioFactory', function($http){
	return {
		sendFile: function (roomId, fd) {
			return $http.put('/api/rooms/audio/' + roomId, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
			.then(function (res) {
				return res.data
			})
		}
	}
})

