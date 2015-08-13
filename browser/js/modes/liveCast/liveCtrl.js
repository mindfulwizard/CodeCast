app.controller('liveCtrl', function($scope, $interval, castFactory, $q) {
   var keystroke = false;

   var timerPromise;

   $scope.startRecording = function() {
   		if(!keystroke) {
				keystroke = true;
            timerPromise = $interval(function(){
               //console.log($scope.textSnip)
               castFactory.sendText($scope.textSnip, new Date());
   			}, 500);
   		}
   }

   // promise = $scope.startRecording();

   $scope.endInterval = function() {
   		$interval.cancel(timerPromise);
   }

   

});