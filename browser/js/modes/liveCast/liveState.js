app.config(function($stateProvider) {
	$stateProvider.state('liveState', {
		url: '/live/:roomId',
		templateUrl: 'js/modes/liveCast/live.html',
		controller: 'liveCtrl',
		resolve: {
			//replaced joinsocket with http call
			roomInfo: function($http, $stateParams) {
				return $http.get('/api/rooms/' + $stateParams.roomId)
				  .then(function(res) {
				  	return res.data;
				  });
			}
		},
		onExit: function(socketFactory, $stateParams, AuthService) {
			 AuthService.getLoggedInUser().then(function (user) {
			 	console.log('on exit inside AuthService CallBack', user)
				socketFactory.emit('leave', {room: $stateParams.roomId, user: user});
			})
		}
	})
})