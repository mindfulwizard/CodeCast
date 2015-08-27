app.controller('ModalInstanceCtrl', function($scope, $modalInstance, $state, $http, castFactory, roomId) {

	$scope.roomId = roomId;

	// $scope.goHome = function () {
	// 	console.log('hit the goHome function')
	// 	$state.go('home')
	// 	$modalInstance.close();
	// }

	$scope.goToReplay = function (roomId) {
		console.log('hit the goToReplay function')
		$state.go('/replayState/' + roomId);
		$modalInstance.close()
	}

    $scope.close = function () {
    	console.log('hit the close')
        $modalInstance.close();
    };

    // $scope.cancel = function () {
    // $modalInstance.dismiss('cancel');
    // };


})
