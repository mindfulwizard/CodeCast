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


    $scope.stopRecording = function() {
        recorder.stop();
        recorder.exportWAV(function(blob){
               var url = URL.createObjectURL(blob);
               var a = document.createElement("a");
               a.href = url;
               a.download 
               a.click();= $scope.roomId + '.wav';
               window.URL.revokeObjectURL(url);
               audioFactory.sendBuffer($scope.roomId, url)
        })

    }

    $scope.playBuffer = function(buffers) {
        audioFactory.getBuffer($scope.roomId)
            .then(function(audioFileObj) {
                console.log(audioFileObj)
                var li = document.createElement('li');
                var au = document.createElement('audio');
                au.controls = true;
                au.src = audioFileObj;
                li.appendChild(au);
                recordingslist.appendChild(li); 
            })
    }
})