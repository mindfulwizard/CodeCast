app.controller('liveCtrl', function($scope, $interval, castFactory, $q, $document, $rootScope, socketFactory, evaluatorFactory) {


    socketFactory.on('change the textSnip', function(obj) {

        $scope.textSnip = obj.data
    })

    $scope.editorOptions = {
        lineWrapping: true,
        lineNumbers: true,
        mode: 'javascript',
        smartIndent: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        keyMap: 'sublime'
    };

    $scope.output = 'waiting for results'

    $scope.$on('console', function(event, data) {
        $scope.output = '\n' + data
    })


    var keystroke = false;
    var timerPromise;
    $scope.replayId;
    $scope.evals = [];

    $scope.startRecording = function() {
        // console.log('startRecording')

        if (!keystroke) {
            keystroke = true;

            castFactory.createReplay()
                .then(function(replayId) {
                    $scope.replayId = replayId;
                    timerPromise = $interval(function() {
                        castFactory.sendText($scope.textSnip, new Date(), replayId);
                    }, 500);

                })

        }

    }

    $scope.startSharing = function() {
        // console.log('start sharing')
        socketFactory.emit('instructor writing', {
            data: $scope.textSnip
        })
    }

    $scope.endInterval = function() {
        $interval.cancel(timerPromise);
        $scope.evals.forEach(function(time){
            castFactory.addEvalClick(time, $scope.replayId);   
        })
    }


    $scope.getResultCode = function() {
        var time = new Date();
        $scope.evals.push(time);
        evaluatorFactory.evalCode($scope.textSnip, $rootScope);
    }

});