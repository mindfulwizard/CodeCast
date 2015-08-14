app.config(function($stateProvider) {
	$stateProvider.state('replayState', {
		url: '/replay',
		templateUrl: 'js/modes/replayCast/replay.html',
		controller: 'replayCtrl',
		params: {replayId: null}
	})
})