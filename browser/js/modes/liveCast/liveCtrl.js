app.controller('liveCtrl', function($scope,$interval, castFactory) {
   // $scope.textSnip = "";
   // $scope.getText = function(text){
   //      liveFactory.sendText(text);
   // }

    $interval(liveFactory.sendText($scope.textSnip, new Date()), 500);
     
});