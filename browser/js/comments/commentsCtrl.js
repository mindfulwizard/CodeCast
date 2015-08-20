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
        if (!$scope.commentsArr) {
            $scope.commentsArr = [];
        }
        $scope.commentsArr.push(commentObj);

    })
})