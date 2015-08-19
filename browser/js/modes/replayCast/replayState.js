app.config(function($stateProvider) {
	$stateProvider.state('replayState', {
		url: '/replay/:roomId',
		templateUrl: 'js/modes/replayCast/replay.html',
		controller: 'replayCtrl'
		// params: {replayId: null}
	})
})