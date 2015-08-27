app.directive('editor', function() {
	return {
		templateUrl: 'js/modes/editor/editor.html',
		restrict: 'E',
		scope: {
			replayText: '=', 
			name: '@',
			output: '=',
			user: '=',
			instructor: '=',
			fork: "=",
			stopRec: "="
		},
		controller: 'editorCtrl'
	}
})