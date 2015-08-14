app.controller('liveCtrl', function($scope, $interval, castFactory, $q) {
   var keystroke = false;
   var timerPromise;
   var replayId;

   $scope.startRecording = function() {
   		if(!keystroke) {
				keystroke = true;

            castFactory.createReplay()
            .then(function(replayId) {
            timerPromise = $interval(function(){
               console.log($scope.textSnip)
               castFactory.sendText($scope.textSnip, new Date(), replayId);
   			}, 500);
               
            })

   		}
   }

   $scope.endInterval = function() {
   		$interval.cancel(timerPromise);
   }

   

});