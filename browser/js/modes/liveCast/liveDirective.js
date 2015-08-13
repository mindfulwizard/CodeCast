app.directive('ng-interval', ['$interval', function($interval){
	return {
		restrict: 'A',
		require: 'ngModel',
		controller: 'liveCtrl',
		link: function(scope, element, attribute) {
					$interval(function(){
						scope.getText(textSnip);
					}, 500)

					}
		}
	
}])