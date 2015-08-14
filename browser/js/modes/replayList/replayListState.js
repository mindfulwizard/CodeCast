app.config(function($stateProvider) {
	$stateProvider.state('replayListState', {
		url: '/replaylist',
		templateUrl: 'js/modes/replayList/replayList.html',
		controller: 'replayListCtrl',
		resolve: {
			replays: function(castFactory) {
				return castFactory.getReplays();
			}
		}
	})
})