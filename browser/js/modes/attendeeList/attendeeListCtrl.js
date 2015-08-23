app.controller('attendeeListCtrl', function($scope, $stateParams){

	$scope.room;
	$scope.students;

	$scope.select= function(item) {
 		$scope.selectedStudent = item;
 		$scope.selectedStudent.canType = true;

 	};

	//for adding classes to user on click
	// $scope.allowTyping = function(item) {
	// 	return $scope.selected === item;
	// }
	//  ng-class="{canType: allowTyping(student)}"

});