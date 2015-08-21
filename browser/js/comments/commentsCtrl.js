app.controller('commentsCtrl', function($scope, forkFactory, $stateParams, socketFactory, castFactory) {

  $scope.commentsArr;

  // creates a comment to be sent to back end via sockets
  $scope.createComment = function(commentText) {
        castFactory.sendComment(commentText, $stateParams.roomId)
    }

    // update comments everytime one user writes on
    socketFactory.on('receive comment', function (commentArr) {
        $scope.commentsArr = commentArr;
    })

})