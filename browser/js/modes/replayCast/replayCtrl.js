app.controller('replayCtrl', function($scope,$interval, castFactory) {
  
    function sortSlices(sliceList){
        return sliceList.sort(function(a,b){
            if (a.time < b.time) return -1;
            if(a.time > b.time) return 1;
            return 0;
         })
    } 
    
    function renderFullCast(sortedSlices){
        for (var i; sortedSlices.length > i; i++) 
            $interval(console.log(sortedSlices[i]), 500);
    }
    
    $scope.getFullCast = function(){
        castFactory.getCast()
        .then(function(sliceList){
            sortSlice(sliceList);
            })
        .then(function(sorted){
            renderFullCast(sorted);
        })
    }
});