app.controller('audioCtrl', function($scope, audioFactory, $timeout, $window) {
    var recorder;
    var startDate;
    var audio_context;

    //     if ($scope.name !== "replay") {
    //         window.AudioContext = window.AudioContext || window.webkitAudioContext;
    //         navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    //         window.URL = window.URL || window.webkitURL;

    //         audio_context = new AudioContext;

    //         navigator.getUserMedia({
    //             audio: true
    //         }, startUserMedia, function(e) {
    //             console.log('not recording!')
    //             //$route.reload();
    //             //$window.location.reload();
    //         });
    //     }


    // function startUserMedia(stream) {
    //     var input = audio_context.createMediaStreamSource(stream);
    //     recorder = new Recorder(input);
        
    // }

    // $scope.startRecording = function() {
    //     startDate = new Date();
    //     recorder.record();
    // }


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

