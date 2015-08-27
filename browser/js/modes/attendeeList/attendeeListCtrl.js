app.controller('attendeeListCtrl', function($scope, $stateParams, socketFactory){
$scope.room;
console.log('$scope.room in ATTENDEELISTCTRL', $scope.room)

	$scope.select = function(student) {
		if(($scope.selectedStudent) && $scope.selectedStudent._id === student._id){
			socketFactory.emit('select one user',  {userId: $scope.selectedStudent._id, roomId: $scope.room._id})
			$scope.selectedStudent = undefined;
		} else {
			$scope.selectedStudent = student
			socketFactory.emit('select one user',  {userId: $scope.selectedStudent._id, roomId: $scope.room._id})
		}
 		// console.log('select studentid', $scope.selectedStudent);
 		// console.log('scope.room', $scope.room);
 		

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