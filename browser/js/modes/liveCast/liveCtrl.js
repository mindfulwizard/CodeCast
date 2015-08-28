app.controller('liveCtrl', function ($scope, $interval, castFactory, $q, $document, $rootScope, socketFactory, $stateParams, evaluatorFactory, $state, roomInfo, setUser, $modal) {
  $scope.user = setUser;
  $scope.room = roomInfo;
  $scope.roomId = $stateParams.roomId;
  $scope.currentlyRecording = false;
  console.log('user in liveCtrl', $scope.user)

  // socketFactory.emit('join', {room: $stateParams.roomId, user: $scope.user})
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
    console.log('obj in liveCtrl for modal', obj)
    var obj = obj;
    var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'js/modes/closingWindowModal/modal.html',
          controller: 'ModalInstanceCtrl',
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
  }

  $scope.constantRecording = function() {
      castFactory.sendText($scope.replayObj.text, new Date(), $stateParams.roomId, $scope.replayObj.result);
  }
});