app.config(function($stateProvider) {
	$stateProvider.state('teacherDashboard.roomState', {
		url: '/room/:instructorId',
		templateUrl: 'js/rooms/room.html',
		controller: 'roomCtrl'
	})
})