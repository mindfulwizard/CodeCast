app.controller('liveCtrl', function($scope, $interval, castFactory, $q, $document, $rootScope, socketFactory, $stateParams, evaluatorFactory) {
    $scope.replayObj = {
        text: null
    };

    socketFactory.emit('join', $stateParams.roomId)
    socketFactory.on('get code history', function(history) {
        // if (history === $stateParams.roomId)
        //console.log('history', history)
        $scope.replayObj.text = history;
        //console.log('$scope', $scope)
    })


    // //listener for when codehistory changes on joining a room
    // //everytime the instruction types, change the textsnip
    socketFactory.on('change the textSnip', function(str) {
        //console.log('str', str)
        $scope.replayObj.text = str;
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
            data: $scope.replayObj.text,
            roomId: $stateParams.roomId
        })
    }

    $scope.endInterval = function() {
        $interval.cancel(timerPromise);
    }


});