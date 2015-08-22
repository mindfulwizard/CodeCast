app.controller('audioCtrl', function($scope, audioFactory, $timeout) {
    var audio_context;
    var recorder;
    var startDate;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    audio_context = new AudioContext;



    navigator.getUserMedia({
        audio: true
    }, startUserMedia, function(e) {
        console.log('No live audio input: ' + e);
    });



    function startUserMedia(stream) {
        var input = audio_context.createMediaStreamSource(stream);
        recorder = new Recorder(input);
    }

    $scope.startRecording = function() {
        startDate = new Date();
        recorder.record();
    }

    var BinaryFileReader = {
        read: function(file, callback) {
            var reader = new FileReader;

            var fileInfo = {
                name: file.name,
                type: file.type,
                size: file.size,
                file: null
            }

            reader.onload = function() {
                fileInfo.file = new Uint8Array(reader.result);
                callback(null, fileInfo);
            }
            reader.onerror = function() {
                callback(reader.error);
            }

            reader.readAsArrayBuffer(file);
        }
    }

// $scope.recording;

    $scope.stopRecording = function() {
        recorder.stop();
        recorder.exportWAV(function(blob) {
            BinaryFileReader.read(blob, function(err, fileInfo) {
                audioFactory.sendBuffer($scope.roomId, fileInfo)
                .then(function(room){
                	//console.log("ROOM ", room.audioFileObj);
                })
            })
        });

    }

    $scope.playBuffer = function(buffers) {
     		audioFactory.getBuffer($scope.roomId)
     		.then(function(rec){
     			$timeout(function(){
     			 if (rec) {
	                var au = document.createElement('audio');
	                au.controls = true;
	                var blob = new Blob([rec.file], {
	                    type: rec.type
	                });
	                au.src = URL.createObjectURL(blob);
	                document.getElementById("recordingslist").appendChild(au);
	            }
     			console.log(rec)
	        	}, 10000)
	       

     		})
    }

})