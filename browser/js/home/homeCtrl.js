app.controller('homeCtrl', function($scope, $rootScope, $state, socketFactory, roomFactory) {
	$scope.rooms;
	roomFactory.getAllRooms()
		.then(function(rooms) {
			$scope.rooms = rooms;
		})
	// socket.on('give room to front-end', function(obj) {
	// 	$scope.rooms = obj;
	// 	console.log("rooms on the scope", $scope.rooms);
	// })
	// $state.go('home');
});