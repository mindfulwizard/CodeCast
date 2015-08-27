app.controller('roomCtrl', function($scope, $state, roomFactory, $stateParams) {

    console.log('instructorId in roomCtrl with stateparams', $stateParams.instructorId)

    $scope.createRoom = function() {
        roomFactory.makeRoom($scope.roomName, $stateParams.instructorId)
        // .then(function() {
        // })
        .then(function() {
            $state.go('teacherDashboard.futureLectures');
        })
    }

});