app.directive('fork', function() {
	return {
		templateUrl: 'js/modes/fork/fork.html',
		restrict: 'E',
		scope: {
			replayObj: '=',
			pauseContinue: '=',
			name: '@',
			roomId: '='
		},
		controller: 'forkCtrl'
	}
})