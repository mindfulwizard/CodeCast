app.controller('liveCtrl', function($scope, $interval, castFactory, $q, $document, $rootScope, socketFactory, $stateParams, evaluatorFactory) {

  socketFactory.emit('join', $stateParams.roomId)
  socketFactory.on('get code history', function(history) {
    // if (history === $stateParams.roomId)
    //console.log('history', history)
    $scope.replayObj = {
      text: null
    };
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
        castFactory.sendText($scope.replayObj.text, new Date(), replayId, $stateParams.roomId);
      })

    }

  }


  // $scope.startSharing = function() {
  //   // console.log('start sharing')
  //   socketFactory.emit('instructor writing', {
  //     data: $scope.replayObj.text,
  //     roomId: $stateParams.roomId
  //   })
  // }

  $scope.endInterval = function() {
    $interval.cancel(timerPromise);
  }


});