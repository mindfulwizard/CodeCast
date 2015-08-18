app.controller('liveCtrl', function($scope, $interval, castFactory, socketFactory, evaluatorFactory) {
    $scope.replayObj = {text: null};

    socketFactory.on('change the replayText', function(obj) {
        $scope.replayObj.text = obj.data;
    })


    var keystroke = false;
    var timerPromise;
    $scope.replayId;
    $scope.evals = evaluatorFactory.liveEvals;

    $scope.startRecording = function() {
        if (!keystroke) {
            keystroke = true;

            castFactory.createReplay()
                .then(function(replayId) {
                    $scope.replayId = replayId;
                    timerPromise = $interval(function() {
                        castFactory.sendText($scope.replayObj.text, new Date(), replayId);
                    }, 500);

                })

        }

    }

    $scope.startSharing = function() {
        // console.log('start sharing')
        socketFactory.emit('instructor writing', {
            data: $scope.replayObj.text
        })
    }

    $scope.endInterval = function() {
        $interval.cancel(timerPromise);
        $scope.evals.forEach(function(time){
            castFactory.addEvalClick(time, $scope.replayId);   
        })
    }

});