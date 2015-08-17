app.directive('editor', function() {
	return {
		templateUrl: 'js/modes/editor/editor.html',
		restrict: 'E',
		scope: {
			replayText: '=codeData'
		},
		controller: 'editorCtrl'
	}
})