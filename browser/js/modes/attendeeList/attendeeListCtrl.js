app.controller('attendeeListCtrl', function($scope, $stateParams, socketFactory) {
	$scope.room;
	$scope.user;

	 // socketFactory.on('add to room.students', function(newRoom) {
	 //    $scope.room = newRoom;
	 //    console.log('room.students after joined by user', $scope.room.students)
	 //  })

	 //  socketFactory.on('delete from room.students', function(newRoom) {
	 //    $scope.room = newRoom;
	 //  })


	$scope.select = function(student) {
		if (($scope.selectedStudent) && $scope.selectedStudent._id === student._id) {
			socketFactory.emit('select one user', {
				userId: $scope.selectedStudent._id,
				roomId: $scope.room._id
			})
			$scope.selectedStudent = undefined;
		} else {
			$scope.selectedStudent = student
			socketFactory.emit('select one user', {
				userId: $scope.selectedStudent._id,
				roomId: $scope.room._id
			})
		}

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