app.controller('studentDashboardCtrl', function($scope, userFactory, castFactory) {
    $scope.instructors;
    $scope.instructorRooms;
    $scope.showRooms = false;
    $scope.forks;
    $scope.liveLectures;
    $scope.replayLectures;
    $scope.user;

    userFactory.getInstructors()
        .then(function(instructors) {
            $scope.instructors = instructors;
        })


    // userFactory.getForks()
    // .then(function(forks){
    // 	$scope.forks = forks;
    // 	//this has all the forks. we should sort by fork room Id and display based on that
    // })

    $scope.getLecture = function(instructorId) {
        if (!$scope.showRooms) {
            userFactory.getRoomsByInstructor(instructorId)
                .then(function(rooms) {
                    $scope.instructorRooms = rooms;
                    $scope.showRooms = true;
                })
        } else {
            $scope.showRooms = false;
        }
    }

    $scope.getAllLiveCasts = function() {
        castFactory.getAllLive()
            .then(function(liveLectures) {
                $scope.liveLectures = liveLectures;
            })
    }

    $scope.getAllLiveCasts();

    $scope.getAllReplayCasts = function() {
        castFactory.getAllReplays()
            .then(function(replays) {
                $scope.replayLectures = replays;
            })
    }
    $scope.getAllReplayCasts();

    $scope.getCurrentUser = function() {
        userFactory.getUser()
            .then(function(user) {
                $scope.user = user;
            })
    }


    $scope.getCurrentUser();

    // $scope.credentials = {};

    // $scope.sendLogin = function (signUpInfo) {

    //     AuthService.signup(signUpInfo).then(function () {
    //         $state.go('home');
    //     }).catch(function () {
    //         $scope.error = 'Invalid login credentials.';
    //     });

    // };

});