app.controller('roomCtrl', function($scope, $state, roomFactory, $stateParams) {

    console.log('instructorId in roomCtrl with stateparams', $stateParams.instructorId)

    $scope.createRoom = function() {
        //console.log('did it get instructorId in room state?', $stateParams.instructorId)
        roomFactory.makeRoom($scope.roomName, $stateParams.instructorId)
        // .then(function() {
        //     console.log('room on the front end created');
        // })
        .then(function() {
            //console.log("hitting .then")
            $state.go('teacherDashboard.futureLectures');
        })
    }

});