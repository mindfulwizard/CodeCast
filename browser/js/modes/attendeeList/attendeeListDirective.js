app.directive('attendeeList', function() {
	return {
		templateUrl: 'js/modes/attendeeList/attendeeList.html',
		restrict: 'E',
		scope: {
			room: "="
		},
		controller: 'attendeeListCtrl'
	}
})