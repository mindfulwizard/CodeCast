app.controller('ModalInstanceCtrl', function($scope, $modalInstance, $state, $http, castFactory, roomId, userId) {

	$scope.roomId = roomId;
	$scope.userId = userId;

    $scope.close = function (roomId) {
        $modalInstance.close();
    };

})
