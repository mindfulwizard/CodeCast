app.controller('attendeeListCtrl', function($scope, $stateParams){

$scope.room;
console.log('$scope.room in attendeeListCtrl', $scope.room)


	$scope.select= function(student) {
 		$scope.selectedStudent = student;
 		if(!$scope.selectedStudent.canType) {
 			$scope.selectedStudent.canType = true;
 		} else {
 			$scope.selectedStudent.canType = false;
 		}
 			$scope.allowUser($scope.selectedStudent);
 	};

	//for adding classes to user on click
	// $scope.allowTyping = function(item) {
	// 	return $scope.selected === item;
	// }
	//  ng-class="{canType: allowTyping(student)}"

});