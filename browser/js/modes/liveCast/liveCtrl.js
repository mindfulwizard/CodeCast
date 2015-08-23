app.controller('liveCtrl', function($scope, $interval, castFactory, $q, $document, $rootScope, socketFactory, $stateParams, evaluatorFactory, $state, roomInfo, AuthService, AUTH_EVENTS) {
  // wrap the whole ctrl inside this .then
  AuthService.getLoggedInUser().then(function (user) {

  $scope.user = user;
  $scope.room = roomInfo;
  $scope.currentlyRecording = false;

  socketFactory.emit('join', {room: $stateParams.roomId, user: $scope.user})
  $scope.replayObj = {text: roomInfo.textHistory, result: roomInfo.resultHistory, comments: roomInfo.commentHistory};

  // //listener for when roomInfo changes on joining a room
  // //everytime the instructor types, change the textsnip and the result if there is
  socketFactory.on('change the textSnip', function(codeSliceObj) {
    //console.log('str', str)
    $scope.replayObj.text = codeSliceObj.text;
    $scope.replayObj.result = codeSliceObj.result;
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
        castFactory.sendText($scope.replayObj.text, new Date(), $stateParams.roomId, $scope.replayObj.result);
    }    
  }

  $scope.deleteRoom = function () {
    $scope.currentlyRecording = false;
    castFactory.endLecture($stateParams.roomId)
    .then(function () {
      $state.go('home')
    })
  }

  // Auth and permissions

  // $scope.user;

  // if (AuthService.isInstructor()) { $scope.user = 'instructor'}
  // else {$scope.user = 'student'}



  // var setUser = function () {
            // AuthService.getLoggedInUser().then(function (user) {
            //     scope.user = user;
        //     });
        // };

        // var removeUser = function () {
        //     scope.user = null;
        // };

        // setUser();
      })
});