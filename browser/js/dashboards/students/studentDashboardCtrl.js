app.controller('studentDashboardCtrl', function ($scope, userFactory, castFactory) {
	$scope.instructors;
	$scope.instructorRooms;
	$scope.showRooms = false;
	$scope.forks;
	$scope.liveLectures;
	$scope.replayLectures;

	userFactory.getInstructors()
	.then(function(instructors){
		$scope.instructors = instructors;
	})

	userFactory.getForks()
	.then(function(forks){
		$scope.forks = forks;
		//this has all the forks. we should sort by fork room Id and display based on that
	})

	$scope.getLecture = function(instructorId){
		userFactory.getRoomsByInstructor(instructorId)
		.then(function(rooms){
			$scope.instructorRooms = rooms;
			$scope.showRooms = true;
		})
	}

	$scope.getAllLiveCasts = function(){
		castFactory.getAllLive()
		.then(function(liveLectures){
			$scople.liveLectures = liveLectures;
		})
	}

	$scope.getAllReplayCasts = function(){
		castFactory.getAllReplays()
		.then(function(replays){
			$scople.replayLectures = replays;
		})
	}


    // $scope.credentials = {};

    // $scope.sendLogin = function (signUpInfo) {

    //     AuthService.signup(signUpInfo).then(function () {
    //         $state.go('home');
    //     }).catch(function () {
    //         $scope.error = 'Invalid login credentials.';
    //     });

    // };

});