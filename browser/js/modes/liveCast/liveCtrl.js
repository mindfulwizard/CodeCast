app.controller('liveCtrl', function($scope, $interval, castFactory) {
   // $scope.textSnip = "";
   // $scope.getText = function(text){
   //      liveFactory.sendText(text);
   // }
   var keystroke = false;

   $scope.startRecording = function() {
   		if(!keystroke) {
   			$interval(function(){
   				castFactory.sendText($scope.textSnip, new Date());
   				keystroke = true;
   			}, 500);
   		}
   }

   $scope.endInterval = function() {
   		$interval.cancel(function() {
   			
   		});
   }

   

});