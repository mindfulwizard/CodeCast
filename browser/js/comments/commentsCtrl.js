app.controller('commentsCtrl', function($scope, forkFactory, $stateParams, socketFactory, castFactory) {

  $scope.commentsArr;
  $scope.user;


  // creates a comment to be sent to back end via sockets
  $scope.createComment = function(commentText) {
    castFactory.sendComment(commentText, $scope.user._id, $stateParams.roomId)
  }

  // update comments everytime one user writes on
  socketFactory.on('receive comment', function(room) {
    $scope.commentsArr = room.commentHistory;
  })

})