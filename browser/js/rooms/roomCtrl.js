app.controller('roomCtrl', function($scope, $state, roomFactory, $stateParams) {

    $scope.createRoom = function() {
        roomFactory.makeRoom($scope.roomName, $stateParams.instructorId)
        // .then(function() {
        // })
        .then(function() {
            $state.go('teacherDashboard.futureLectures');
        })
    }

});