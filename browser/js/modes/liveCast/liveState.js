app.config(function($stateProvider) {
	$stateProvider.state('liveState', {
		url: '/live',
		templateUrl: 'js/modes/liveCast/live.html',
		controller: 'liveCtrl'
	})
})