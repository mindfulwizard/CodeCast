app.config(function($stateProvider) {
	$stateProvider.state('liveState', {
		url: '/live/:roomId',
		templateUrl: 'js/modes/liveCast/live.html',
		controller: 'liveCtrl',
		resolve: {
			//replaced joinsocket with http call
			codeHistory: function($http, $stateParams) {
				return $http.get('/api/rooms/' + $stateParams.roomId)
				  .then(function(res) {
				  	console.log('res.data.commentHistory in codeHistory', res.data.commentHistory)
				  	return res.data;
				  });
			}
		},
		onExit: function(socketFactory, $stateParams) {
			// console.log("stateparams", $stateParams.roomId)
			// console.log(socketFactory, "factory")
			socketFactory.emit('leave', $stateParams.roomId);
		}
		// resolve: {
		// 	initializeScopeComments: function ($scope) {
		// 		$scope.comments = [];
		// 		return $scope.comments
		// 	}
		// }
	})
})