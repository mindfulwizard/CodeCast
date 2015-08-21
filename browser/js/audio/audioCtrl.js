app.controller('audioCtrl', function($scope, audioFactory){
	var audio_context;
  	var recorder;
  	var startDate;

  	 window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      
      audio_context = new AudioContext;



       navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      console.log('No live audio input: ' + e);
    });



    function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
	recorder = new Recorder(input);
  	}

	$scope.startRecording = function(){
		startDate = new Date();
		recorder.record();
	}

	$scope.stopRecording = function(){
		recorder.stop();
		// recorder.getBuffer(function(buffer){
		// 	// audioFactory.sendBuffer($scope.roomId, buffer)
		// 	// 	$scope.playBuffer(buffer);
		// });
		(function createDownloadLink() {
		    recorder && recorder.exportWAV(function(blob) {

		      var url = URL.createObjectURL(blob);

		     audioFactory.sendBuffer($scope.roomId, url)
		     .then(function(room){
			      
			      var li = document.createElement('li');
			      var au = document.createElement('audio');
			      var hf = document.createElement('a');
			      au.controls = true;
			      au.src = room.audioUrl.slice(5);
			      hf.href = room.audioUrl.slice(5);
			      hf.download = startDate.toISOString() + '.wav';
			      hf.innerHTML = hf.download;
			      li.appendChild(au);
			      li.appendChild(hf);
			      recordingslist.appendChild(li);
			
		     })

		    });
  		})();
	}

	$scope.playBuffer = function(buffers){
		// var newSource = audio_context.createBufferSource();
		// var newBuffer = audio_context.createBuffer(2, buffers[0].length, audio_context.sampleRate);
		// newBuffer.getChannelData(0).set(buffers[0]);
		// newBuffer.getChannelData(1).set(buffers[1]);
		// newSource.buffers = newBuffer;


		// newSource.connect(audio_context.destination);
		// newSource.start(0)
}

})


