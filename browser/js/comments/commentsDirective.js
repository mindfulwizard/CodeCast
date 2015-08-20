app.directive('comments', function() {
	return {
		templateUrl: 'js/comments/comments.html',
		restrict: 'E',
		controller: 'commentsCtrl'
	}
})