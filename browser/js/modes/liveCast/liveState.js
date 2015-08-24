app.config(function($stateProvider) {
	$stateProvider.state('liveState', {
		url: '/live/:roomId',
		templateUrl: 'js/modes/liveCast/live.html',
		controller: 'liveCtrl',
		resolve: {
			//replaced joinsocket with http call
			joinRoom: function($stateParams, socketFactory, AuthService) {
				 AuthService.getLoggedInUser().then(function (user) {
					socketFactory.emit('join', {room: $stateParams.roomId, user: user})
				 })
			},
			setUser: function (AuthService) {
				return AuthService.getLoggedInUser().then(function (user) {
					return user;
				})
			},
			roomInfo: function($http, $stateParams) {
				return $http.get('/api/rooms/' + $stateParams.roomId)
				  .then(function(res) {
				  	console.log('room in resolve', res.data)
				  	return res.data;
				  });
			}
		},
		onExit: function(socketFactory, $stateParams, AuthService) {
			 AuthService.getLoggedInUser().then(function (user) {
				socketFactory.emit('leave', {room: $stateParams.roomId, user: user});
			})
		}
	})
})