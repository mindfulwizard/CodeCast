app.directive('editor', function() {
	return {
		templateUrl: 'js/modes/editor/editor.html',
		restrict: 'E',
		// scope: {
		// 	forkedText: '=sortedSlices[sliceIndex-1].text',
		// 	action: '&'
		// },
		controller: 'editorCtrl'
	}
})