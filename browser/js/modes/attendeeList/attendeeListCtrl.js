app.controller('attendeeListCtrl', function($scope, $stateParams){

	$scope.room;
	$scope.students;

	$scope.select= function(item) {
        $scope.selected = item; 
 	};

	$scope.allowTyping = function(item) {
		return $scope.selected === item;
	}

});