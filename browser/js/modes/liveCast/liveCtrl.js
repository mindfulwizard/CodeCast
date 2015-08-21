app.controller('liveCtrl', function($scope, $interval, castFactory, $q, $document, $rootScope, socketFactory, $stateParams, evaluatorFactory, $state) {
  $scope.roomId = $stateParams.roomId;
  console.log($scope.roomId)

  $scope.currentlyRecording = false;

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
  $scope.evals = evaluatorFactory.liveEvals;

  $scope.startLecture = function () {
    if(!$scope.currentlyRecording){
      castFactory.startLecture($stateParams.roomId)
      $scope.currentlyRecording = true;
      console.log('hit the start lecture')
    }
  } 

  $scope.constantRecording = function() {
    if($scope.currentlyRecording){
        castFactory.sendText($scope.replayObj.text, new Date(), $stateParams.roomId);
    }    
  }

  $scope.deleteRoom = function () {
    $scope.currentlyRecording = false;
    castFactory.endLecture($stateParams.roomId)
    .then(function () {
      //$state.go('home')
    })
  }
});