app.directive('attendeeList', function() {
	return {
		templateUrl: 'js/modes/attendeeList/attendeeList.html',
		restrict: 'E',
		scope: {
			room: '=',
			user: '=',
			student: '='
		},
		controller: 'attendeeListCtrl'
	}
})