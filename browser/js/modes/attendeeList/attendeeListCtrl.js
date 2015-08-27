app.controller('attendeeListCtrl', function($scope, $stateParams, socketFactory) {
	$scope.room;
	$scope.user;

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
console.log('selectedStudent', $scope.selectedStudent)
	};

	socketFactory.on('selected user disconnected', function (room) {
		var userStillThere = false;
		console.log('selectedStudent before change', $scope.selectedStudent)
		if ($scope.selectedStudent) {
		console.log('selectedStudent in the IF', $scope.selectedStudent)
		room.students.forEach(function (student) {
				if (($scope.selectedStudent._id).toString() === (student._id).toString()) {
					userStillThere = true;
					console.log('still there or not inside ForEach', userStillThere)
				}
			})
		console.log('userStillThere', userStillThere)
		if (!userStillThere) {
			$scope.selectedStudent = undefined;
			}
		}
		console.log('scope.selected student should be undefined', $scope.selectedStudent)
	})



});