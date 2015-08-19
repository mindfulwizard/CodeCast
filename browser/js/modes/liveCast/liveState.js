app.config(function($stateProvider) {
	$stateProvider.state('liveState', {
		url: '/live/:roomId',
		templateUrl: 'js/modes/liveCast/live.html',
		controller: 'liveCtrl',
		// resolve: {
		// 	codeHistory: function($http) {
		// 		return $http.get('/api/codeHistory/:roomId')
		// 		  .then(function(res) {
		// 		  	return res.data;
		// 		  });
		// 	}
		// }
		onExit: function(socketFactory, $stateParams) {
			// console.log("stateparams", $stateParams.roomId)
			// console.log(socketFactory, "factory")
			socketFactory.emit('leave', $stateParams.roomId);
		}
	})
})