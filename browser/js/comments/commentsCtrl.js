app.controller('commentsCtrl', function($scope, forkFactory, $stateParams, socketFactory, castFactory) {

  $scope.commentsArr;
  $scope.user;

  console.log('commentsArr', $scope.commentsArr)

  // creates a comment to be sent to back end via sockets
  $scope.createComment = function(commentText) {
  	console.log('create comment with text userId roomId', commentText, $scope.user._id, $stateParams.roomId)
        castFactory.sendComment(commentText, $scope.user._id, $stateParams.roomId)
    }

    // update comments everytime one user writes on
    socketFactory.on('receive comment', function (commentArr) {
    	console.log('receive comments commentArr', commentArr)
        $scope.commentsArr = commentArr;
    })

})