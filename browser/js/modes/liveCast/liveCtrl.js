app.controller('liveCtrl', function ($scope, $interval, castFactory, $q, $document, $rootScope, socketFactory, $stateParams, evaluatorFactory, $state, roomInfo, setUser, $modal) {
  $scope.user = setUser;
  $scope.room = roomInfo;
  $scope.roomId = $stateParams.roomId;
  $scope.currentlyRecording = false;
  $scope.started = false;


  $scope.replayObj = {
    text: roomInfo.textHistory,
    result: roomInfo.resultHistory,
    comments: roomInfo.commentHistory
  };

  //listener for when roomInfo changes on joining a room
  //everytime the instructor types, change the textsnip and the result if there is
  socketFactory.on('change the textSnip', function(codeSliceObj) {
    $scope.replayObj.text = codeSliceObj.text;
    $scope.replayObj.result = codeSliceObj.result;
  })

  socketFactory.on('add to room.students', function(newRoom) {
    $scope.room = newRoom;
  })

  socketFactory.on('delete from room.students', function(newRoom) {
    $scope.room = newRoom;
  })

  // receive socket event of closed room => open a modal
  socketFactory.on('send the close modal', function (obj) {
    var obj = obj;
    var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'js/modes/closingWindowModal/modal.html',
          controller: 'ModalInstanceCtrl',
          windowClass: 'large-Modal',
          resolve: {
            roomId: function () {
              return obj.room.toString()
            },
            userId: function () {
              return $scope.user;
            }
          }
        });
  })

  var keystroke = false;
  var timerPromise;
  $scope.evals = evaluatorFactory.liveEvals;

  $scope.startLecture = function() {
      castFactory.startLecture($stateParams.roomId);
      $scope.started = true;
      $scope.constantRecording();
  }

  $scope.constantRecording = function() {
      if($scope.started || $scope.room.instructor._id.toString() != $scope.user._id.toString()) {
        castFactory.sendText($scope.replayObj.text, new Date(), $stateParams.roomId, $scope.replayObj.result);
      }
  }
});