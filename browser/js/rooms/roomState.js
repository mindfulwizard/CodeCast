app.config(function($stateProvider) {
	$stateProvider.state('roomState', {
		url: '/room',
		templateUrl: 'js/rooms/room.html',
		controller: 'roomCtrl'
	})
})