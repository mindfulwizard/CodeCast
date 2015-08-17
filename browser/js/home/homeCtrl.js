app.controller('homeCtrl', function($scope, $rootScope, $state, socketFactory) {
	$scope.rooms;
	socket.on('give room to front-end', function(obj) {
		console.log(obj);
		$scope.rooms = obj;
		console.log($scope.rooms);
	})
	// $state.go('home');
});