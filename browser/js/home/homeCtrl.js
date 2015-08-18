app.controller('homeCtrl', function($scope, $rootScope, $state, socketFactory, roomFactory) {
	$scope.rooms;
	roomFactory.getAllRooms()
		.then(function(rooms) {
			$scope.rooms = rooms;
		});
	$scope.joinRoom = function(id) {
		// socketFactory.emit('join', id)
		$state.go('liveState', {
			roomId: id
		})
	}
});