app.config(function($stateProvider) {
	$stateProvider.state('liveState', {
		url: '/live/:roomId',
		templateUrl: 'js/modes/liveCast/live.html',
		controller: 'liveCtrl'
		// resolve: {
		// 	codeHistory: function($http) {
		// 		return $http.get('/api/codeHistory/:roomId')
		// 		  .then(function(res) {
		// 		  	return res.data;
		// 		  });
		// 	}
		// }
	})
})