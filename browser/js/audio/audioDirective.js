app.directive('recorder', function() {
	return {
		templateUrl: 'js/audio/audio.html',
		restrict: 'E',
		controller: 'audioCtrl',
		scope: {
			startRecording: "=",
			stopRecording: "=",
			roomId: "="
		}
	}
})