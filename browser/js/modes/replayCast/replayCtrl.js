app.controller('replayCtrl', function($scope, $interval, castFactory, $stateParams) {
    $scope.replayId = $stateParams.replayId;
    $scope.replayText;

    function sortSlices(sliceList){
        return sliceList.sort(function(a,b){
            if (a.time < b.time) return -1;
            if(a.time > b.time) return 1;
            return 0;
         })
    } 
    
    var sliceIndex = 0;

    function renderFullCast(sortedSlices){
        $interval(function(){
            $scope.replayText = sortedSlices[sliceIndex].text;   
            sliceIndex++;
        }, 500, sortedSlices.length)
        sliceIndex = 0;
    }
    
    $scope.getFullCast = function(){
        return castFactory.getCast($scope.replayId)
        .then(function(sliceList){
            return sortSlices(sliceList);
            })
        .then(function(sorted){
            renderFullCast(sorted);
        })
    }
});