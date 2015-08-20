app.factory('roomFactory', function($http, socketFactory) {
	return {
		getAllRooms: function() {
			return $http.get('/api/rooms')
				.then(function(res) {
					return res.data
				})
		},

		makeRoom: function(name) {
			return $http.post('/api/rooms', {
					name: name
				})
				.then(function(res) {
					socketFactory.emit('initiliaze comments', {roomId: res.data._id})
					return res.data;
				})
		},

		getOneRoom: function(room_id) {
			return $http.get('/api/rooms/' + room_id)
				.then(function(res) {
					return res.data;
				});
		},
		getAllLectures: function() {
			return $http.get('/api/rooms/lectures')
				.then(function(res) {
					return res.data
				})
		},

	};
});