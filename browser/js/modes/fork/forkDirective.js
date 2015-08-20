app.directive('fork', function() {
	return {
		templateUrl: 'js/modes/fork/fork.html',
		restrict: 'E',
		scope: {
			replayObj: '=',
			pause: '=',
			name: '@'
		},
		controller: 'forkCtrl'
	}
})