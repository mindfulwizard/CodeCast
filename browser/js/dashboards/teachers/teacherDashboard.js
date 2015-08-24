app.config(function ($stateProvider) {

    $stateProvider.state('teacherDashboard', {
        url: '/teacherDashboard/:userId',
        templateUrl: 'js/dashboards/teachers/teacherDashboard.html',
        controller: 'teacherDashboardCtrl'
    });

});

app.controller('teacherDashboardCtrl', function ($scope, $rootScope, $state, socketFactory, roomFactory, $stateParams) {
	$scope.rooms;
	$scope.instructorId = $stateParams.userId;

	roomFactory.getAllRoomsOfOneInstructor($stateParams.userId)
		.then(function(rooms) {
			$scope.rooms = rooms;
		});

	roomFactory.getAllLecturesOfOneInstructor($stateParams.userId)
	.then(function(lectures) {
		$scope.lectures = lectures;
		console.log('lectures in Ctrl', $scope.lectures)
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