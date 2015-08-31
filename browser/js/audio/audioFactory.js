
app.factory('audioFactory', function($http, $timeout, $window){
	return {
		setUpAudio: function() {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
            window.URL = window.URL || window.webkitURL;
            var audio_context = new AudioContext;

            navigator.getUserMedia({
                audio: true
            }, function() {
            	var input = audio_context.createMediaStreamSource(stream);
        		return recorder = new Recorder(input);
            }, function(e) {
                console.log('not recording!')
                //$route.reload();
                //$window.location.reload();
            });
		},

		// startRecording: function() {
  //       	var startDate = new Date();
  //       	recorder.record();
  //   	},

    	// stopRecording: function() {
	    //     recorder.stop();
	    //     recorder.exportWAV(function(blob) {
	    //         var fd = new FormData()
	    //         fd.append('data', blob)
	    //         audioFactory.sendFile($scope.roomId, fd)
	    //     })

    	// },


		sendFile: function (roomId, fd) {
			return $http.put('/api/rooms/audio/' + roomId, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
			.then(function (res) {
				return res.data
			})
		}
	}
})

