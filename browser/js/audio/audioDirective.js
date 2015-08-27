app.directive('recorder', function() {
	return {
		restrict: 'E',
		controller: 'audioCtrl',
		scope: {
			startRecording: "=",
			stopRecording: "=", 
			playBuffer: "=",
			audioSrc: "=",
			roomId: "=",
			name: "@"
		}
	}
}) 