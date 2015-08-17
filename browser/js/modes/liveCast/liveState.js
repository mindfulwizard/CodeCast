app.config(function($stateProvider) {
	$stateProvider.state('liveState', {
		url: '/live/:roomId',
		templateUrl: 'js/modes/liveCast/live.html',
		controller: 'liveCtrl'
	})
})