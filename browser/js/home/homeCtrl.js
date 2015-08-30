app.controller('homeCtrl', function($scope, $rootScope, $state, socketFactory, roomFactory) {
	$scope.rooms;
	roomFactory.getAllRooms()
		.then(function(rooms) {
			$scope.rooms = rooms;
		});
	$scope.joinRoom = function(id) {
		$state.go('liveState', {
			roomId: id
		})
	}
	roomFactory.getAllLectures()
		.then(function(lectures) {
			$scope.lectures = lectures;
		});

	$scope.watchLecture = function(id) {
		$state.go('replayState', {
			roomId: id
		})
	}

});