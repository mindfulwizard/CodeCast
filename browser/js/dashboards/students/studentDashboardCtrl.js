app.controller('studentDashboardCtrl', function($scope, userFactory, forkFactory, castFactory, $stateParams, $rootScope, AuthService, AUTH_EVENTS) {
    AuthService.getLoggedInUser()
    .then(function (user) {
        $scope.user = user;
    })

    $scope.instructors;
    $scope.instructorRooms;
    $scope.showRooms = false;
    $scope.forks;
    $scope.liveLectures;
    $scope.replayLectures;
    $scope.forkId = $stateParams.forkId;
    $scope.fork = "fork";
    $scope.forkedLectures = [];
    $scope.showForks = false;
    $scope.roomForks = [];

    userFactory.getInstructors()
        .then(function(instructors) {
            $scope.instructors = instructors;


        })

    // becoming instructor
    $scope.becomeInstructor = function () {
        castFactory.becomeInstructor($scope.user)
        .then(function (user) {
            $scope.user.instructor = true
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            return user;
        })
    }


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


    // replaced by Auth
    // $scope.getCurrentUser = function() {
    //     userFactory.getUser()
    //         .then(function(user) {
    //             $scope.user = user;
    //         })
    // }

    // $scope.getCurrentUser();

    $scope.getForkRoomList = function() {
        userFactory.getForks()
            .then(function(forks) {
                $scope.forks = forks;
                return forks
            })
            .then(function(forks) {
                var allRooms = $scope.liveLectures.concat($scope.replayLectures)
                forks.forEach(function(fork) {
                    allRooms.forEach(function(room) {
                        if (room._id === fork.roomId) {
                            if ($scope.forkedLectures.indexOf(room) === -1)
                                $scope.forkedLectures.push(room)
                        }
                    })
                })
            })
    }

    $scope.getForkRoomList();


    $scope.getRoomForks = function(roomId) {
        if (!$scope.showForks) {
            forkFactory.getUserForks(roomId)
                .then(function(forks) {
                    $scope.roomForks = forks;
                    $scope.showForks = true;
                })
        } else {
            $scope.showForks = false;
        }
    }

    $scope.getFork = function() {
        $scope.forks.forEach(function(fork) {
            if (fork._id === $stateParams.forkId) {
                $scope.forkedText = fork;
            }
        })
    }

    if ($stateParams.forkId !== undefined) {$scope.getFork()};

});