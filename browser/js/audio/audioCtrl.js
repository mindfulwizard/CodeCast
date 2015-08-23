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



    $scope.stopRecording = function() {
        recorder.stop();
        recorder.exportWAV(function(blob) {
            BinaryFileReader.read(blob, function(err, fileInfo) {
                audioFactory.sendBuffer($scope.roomId, fileInfo)
                    .then(function(room) {
                        //console.log("ROOM ", room.audioFileObj);
                    })
            })
        });

    }

    $scope.playBuffer = function(buffers) {
        audioFactory.getBuffer($scope.roomId)
            .then(function(audioFileObj) {
                var buff = [];
                for (var key in audioFileObj) {
                    buff.push(audioFileObj[key])
                }
                var rec = new Blob(buff, {
                    type: 'audio/wav'
                })
                return rec;
            })
            .then(function(rec) {
                var blob = rec;
                    recorder && recorder.exportWAV(function() {
                        var url = URL.createObjectURL(blob);
                        var li = document.createElement('li');
                        var au = document.createElement('audio');
                        var hf = document.createElement('a');

                        au.controls = true;
                        au.src = url;
                        hf.href = url;
                        hf.download = new Date().toISOString() + '.wav';
                        hf.innerHTML = hf.download;
                        li.appendChild(au);
                        li.appendChild(hf);
                        recordingslist.appendChild(li);
                        console.log(blob)
                    })


                
            })
    }
})