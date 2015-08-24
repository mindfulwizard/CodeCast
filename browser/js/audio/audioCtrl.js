app.controller('audioCtrl', function($scope, audioFactory, $timeout, $http) {
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
            var fd = new FormData()
            fd.append('data', blob)
            $http.put('/api/rooms/audio/' + $scope.roomId, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function(res) {
                return res.data
            })
            .then(function(data) {
                console.log(data)
            }, function(err) {
                console.warn(err)
            })
            // console.log(blob);
            // window.bloby = blob
            //    var url = URL.createObjectURL(blob);
            //    var a = document.createElement("a");
            //    a.href = url;
            //    a.download = $scope.roomId + '.wav';
            //    a.click();
            //    window.URL.revokeObjectURL(url);
            //    audioFactory.sendBuffer($scope.roomId, url)
        })

    }

    $scope.playBuffer = function(buffers) {
        $scope.audioSrc = '/api/rooms/audio/' + $scope.roomId
        // audioFactory.getBuffer($scope.roomId)
        //     .then(function(file) {
        //        // console.log(file)
        //         var li = document.createElement('li');
        //         var au = document.createElement('audio');
        //         au.controls = true;
        //         au.src = file;
        //         li.appendChild(au);
        //         recordingslist.appendChild(li); 
        //     })
    }
})