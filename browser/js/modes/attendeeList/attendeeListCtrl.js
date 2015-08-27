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
	};

	socketFactory.on('selected user disconnected', function (room) {
		var userStillThere = false;
		if ($scope.selectedStudent) {
		room.students.forEach(function (student) {
				if (($scope.selectedStudent._id).toString() === (student._id).toString()) {
					userStillThere = true;
				}
			})
		if (!userStillThere) {
			$scope.selectedStudent = undefined;
			}
		}
	})



});