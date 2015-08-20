app.controller('commentsCtrl', function($scope, forkFactory, $stateParams, socketFactory, castFactory) {

	// creates a comment to be sent to back end via sockets
	$scope.createComment = function(commentText) {
        castFactory.sendComment(commentText, $stateParams.roomId)
    }

     socketFactory.on('get comments history', function (historyArrOfObj) {
    $scope.commentsArr = [];
    $scope.commentsArr = historyArrOfObj;
  })

     socketFactory.on('receive comment', function (commentObj) {
        console.log('commentsArr before push', $scope.commentsArr)
        if (!$scope.commentsArr) {
            $scope.commentsArr = [];
        }
        console.log('commentObj', commentObj)
        $scope.commentsArr.push(commentObj);
        console.log('commentsArr after push', $scope.commentsArr)

    })
})