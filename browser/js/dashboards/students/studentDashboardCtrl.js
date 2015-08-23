app.controller('studentDashboardCtrl', function ($scope, userFactory) {
	$scope.instructors;
	$scope.instructorRooms;
	$scope.showRooms = false;
	$scope.forks;

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


    // $scope.credentials = {};

    // $scope.sendLogin = function (signUpInfo) {

    //     AuthService.signup(signUpInfo).then(function () {
    //         $state.go('home');
    //     }).catch(function () {
    //         $scope.error = 'Invalid login credentials.';
    //     });

    // };

});