app.controller('attendeeListCtrl', function($scope, $stateParams, socketFactory){
$scope.room;


	$scope.select= function(student) {
 		$scope.selectedStudent = student._id;
 		console.log('select studentid', $scope.selectedStudent);
 		console.log('scope.room', $scope.room);
 		 socketFactory.emit('select one user',  {userId: $scope.selectedStudent, roomId: $scope.room._id})

 		// if(!$scope.selectedStudent.canType) {
 		// 	$scope.selectedStudent.canType = true;
 		// } else {
 		// 	$scope.selectedStudent.canType = false;
 		// }
 		// 	$scope.allowUser($scope.selectedStudent);
 	};

	//for adding classes to user on click
	// $scope.allowTyping = function(item) {
	// 	return $scope.selected === item;
	// }
	//  ng-class="{canType: allowTyping(student)}"

});