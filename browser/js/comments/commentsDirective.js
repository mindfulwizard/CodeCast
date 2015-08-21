app.directive('comments', function() {
	return {
		templateUrl: 'js/comments/comments.html',
		restrict: 'E',
		scope: {
			commentsArr: '='
		},
		controller: 'commentsCtrl'
	}
})