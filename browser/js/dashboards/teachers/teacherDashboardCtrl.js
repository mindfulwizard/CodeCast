app.controller('teacherDashboardCtrl', function($scope, $rootScope, $state, socketFactory, roomFactory, $stateParams, setUser) {
	$scope.user = setUser;
	$scope.rooms;
	$scope.instructorId = $stateParams.userId;
	roomFactory.getAllFutureLecturesOfOneInstructor($stateParams.userId)
		.then(function(rooms) {
			$scope.rooms = rooms;
		});

	roomFactory.getAllLecturesOfOneInstructor($stateParams.userId)
		.then(function(lectures) {
			$scope.lectures = lectures;
		});

	$scope.joinRoom = function(id) {
		// socketFactory.emit('join', id)
		$state.go('liveState', {
			roomId: id
		})
	}

	roomFactory.getAllLectures()
		.then(function(lectures) {
			$scope.lectures = lectures;
		});

	$scope.watchLecture = function(id) {
		// socketFactory.emit('join', id)
		$state.go('replayState', {
			roomId: id
		})
	}

});