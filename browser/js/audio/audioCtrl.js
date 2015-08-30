app.controller('audioCtrl', function($scope, audioFactory, $timeout, $window) {
    var audio_context;
    var recorder;
    var startDate;

        if ($scope.name !== "replay") {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
            window.URL = window.URL || window.webkitURL;

            audio_context = new AudioContext;

            navigator.getUserMedia({
                audio: true
            }, startUserMedia, function(e) {
                console.log('No live audio input: ' + e);
                //$route.reload();
                $window.location.reload();
            });
        }


    //initiateAudio();


    function startUserMedia(stream) {
        var input = audio_context.createMediaStreamSource(stream);
        recorder = new Recorder(input);
    }

    $scope.startRecording = function() {
        startDate = new Date();
        recorder.record();
    }


    $scope.stopRecording = function() {
        recorder.stop();
        recorder.exportWAV(function(blob) {
            var fd = new FormData()
            fd.append('data', blob)
            audioFactory.sendFile($scope.roomId, fd)
        })

    }

    $scope.playBuffer = function(buffers) {
        $scope.audioSrc = '/api/rooms/audio/' + $scope.roomId
    }
})





// app.controller('audioCtrl', function($scope, audioFactory, $timeout) {
//     var audio_context;
//     var recorder;
//     var startDate;

// <<<<<<< HEAD
//     if ($scope.name !== "replay") {
//         window.AudioContext = window.AudioContext || window.webkitAudioContext;
//         navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
//         window.URL = window.URL || window.webkitURL;


//         audio_context = new AudioContext;



//         navigator.getUserMedia({
//             audio: true
//         }, startUserMedia, function(e) {
//             console.log('No live audio input: ' + e);
//         });


//     }
// =======
//     window.AudioContext = window.AudioContext || window.webkitAudioContext;
//     navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
//     window.URL = window.URL || window.webkitURL;

//     audio_context = new AudioContext;



//     navigator.getUserMedia({
//         audio: true
//     }, startUserMedia, function(e) {
//         console.log('No live audio input: ' + e);
//     });


// >>>>>>> master

//     function startUserMedia(stream) {
//         var input = audio_context.createMediaStreamSource(stream);
//         recorder = new Recorder(input);
//     }

//     $scope.startRecording = function() {
//         startDate = new Date();
//         recorder.record();
//     }

// <<<<<<< HEAD
// =======
//     var BinaryFileReader = {
//         read: function(file, callback) {
//             var reader = new FileReader;

//             var fileInfo = {
//                 name: file.name,
//                 type: file.type,
//                 size: file.size,
//                 file: null
//             }

//             reader.onload = function() {
//                 fileInfo.file = new Uint8Array(reader.result);
//                 callback(null, fileInfo);
//             }
//             reader.onerror = function() {
//                 callback(reader.error);
//             }

//             reader.readAsArrayBuffer(file);
//         }
//     }

// // $scope.recording;
// >>>>>>> master

//     $scope.stopRecording = function() {
//         recorder.stop();
//         recorder.exportWAV(function(blob) {
// <<<<<<< HEAD
//             var fd = new FormData()
//             fd.append('data', blob)
//             audioFactory.sendFile($scope.roomId, fd)
//         })
// =======
//             BinaryFileReader.read(blob, function(err, fileInfo) {
//                 audioFactory.sendBuffer($scope.roomId, fileInfo)
//                 .then(function(room){
//                 	//console.log("ROOM ", room.audioFileObj);
//                 })
//             })
//         });
// >>>>>>> master

//     }

//     $scope.playBuffer = function(buffers) {
// <<<<<<< HEAD
//         $scope.audioSrc = '/api/rooms/audio/' + $scope.roomId
//     }
// =======
//      		audioFactory.getBuffer($scope.roomId)
//      		.then(function(rec){
//      			$timeout(function(){
//      			 if (rec) {
// 	                var au = document.createElement('audio');
// 	                au.controls = true;
// 	                var blob = new Blob([rec.file], {
// 	                    type: rec.type
// 	                });
// 	                au.src = URL.createObjectURL(blob);
// 	                document.getElementById("recordingslist").appendChild(au);
// 	            }
//      			console.log(rec)
// 	        	}, 10000)
	       

//      		})
//     }

// >>>>>>> master
// })