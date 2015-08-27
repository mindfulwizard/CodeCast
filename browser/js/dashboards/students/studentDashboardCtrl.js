app.controller('studentDashboardCtrl', function($scope, userFactory, castFactory, $stateParams) {
    $scope.instructors;
    $scope.instructorRooms;
    $scope.showRooms = false;
    $scope.forks;
    $scope.liveLectures;
    $scope.replayLectures;
    $scope.user;
    $scope.forkId = $stateParams.forkId;
    $scope.fork = "fork";
    $scope.forkedLectures=[];

    userFactory.getInstructors()
        .then(function(instructors) {
            $scope.instructors = instructors;
        })


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

    $scope.getForkRoomList = function(){
    userFactory.getForks()
    .then(function(forks) {
        $scope.forks = forks;
        return forks
    })
    .then(function(forks){
        var allRooms = $scope.liveLectures.concat($scope.replayLectures)
        forks.forEach(function(fork){
           allRooms.forEach(function(room){
            if(room._id === fork.roomId) {
                $scope.forkedLectures.push(room.name)
            }
           })
        })
        console.log($scope.forkedLectures)
    })
}


    $scope.getFork = function(forkId) {
        $scope.forks.forEach(function(fork) {
            if (fork._id === forkId) {
                $scope.forkedText = fork;
            }
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