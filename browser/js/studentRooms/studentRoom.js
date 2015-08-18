app.config(function($stateProvider) {
	$stateProvider.state('studentRoom', {
		url: '/studentRoom/:roomId',
		controller: 'StudentRoomCtrl',
		onEnter: function(SocketFacory, $stateParams) {
			socketFactory.emit('join', $stateParams)
		},
		onExit: function(SocketFacory, $stateParams) {
			socketFactory.emit('leave', $stateParams)
		}
	});
});