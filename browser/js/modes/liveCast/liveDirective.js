app.directive('ng-interval', ['$interval', function($interval){
	return {
		restrict: 'A',
		require: 'ngModel',
		controller: 'liveCtrl',
		}
	
}])