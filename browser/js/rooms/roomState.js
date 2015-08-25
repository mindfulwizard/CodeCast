app.config(function($stateProvider) {
	$stateProvider.state('roomState', {
		url: '/room/:instructorId',
		templateUrl: 'js/rooms/room.html',
		controller: 'roomCtrl'
	})
})