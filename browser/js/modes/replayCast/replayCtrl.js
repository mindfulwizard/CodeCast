app.controller('replayCtrl', function($scope, $rootScope, $interval, castFactory, $stateParams, evaluatorFactory, $timeout) {
    $scope.paused = false;
    $scope.forked = false;
    $scope.videoObj = {text: null};
    $scope.forkedText = {text: null};

    function sortSlices(sliceList) {
        return sliceList.sort(function(a, b) {
            if (a.time < b.time) return -1;
            if (a.time > b.time) return 1;
            return 0;
        })
    }

    var paused = false;
    var sortedSlicesArr;
    var timerPromise;


    var renderFullCast = function(sortedSlicesArr, currentSlice) {
        console.log('inside render ', sortedSlicesArr);
        $scope.videoObj.text = currentSlice.text;
        var next = sortedSlicesArr.shift();
                
        if(next && !paused){
            $timeout(function(){
                renderFullCast(sortedSlicesArr, next)
            }, next.runningTotal - currentSlice.runningTotal)
        } 

    };

    var calculateRunnintTotal = function(first, slice) {
        return slice.runningTotal = Date.parse(slice.time) - Date.parse(first.time) + 1;

    }

    // var renderFullCast = function(sortedSlicesArr) {
    //     console.log('inside render ', sortedSlicesArr);

    //     sortedSlicesArr.forEach(function(codeSlice){
    //         calculateRunnintTotal(sortedSlicesArr[0], codeSlice);
    //         console.log('pausestatus', $scope.paused)
    //         if(!paused){
    //             $timeout(function(){
    //                 $scope.videoObj.text = codeSlice.text;   
    //             }, codeSlice.runningTotal)
    //         }    
    //     })
    // };


    $scope.getFullCast = function() {
        //get array of all codeSlices associated with a specific room
        return castFactory.getCast($stateParams.roomId)
            .then(function(sliceList) {
                //order array by time
                return sortSlices(sliceList);
            })
            .then(function(sortedArr) {
                sortedSlicesArr = sortedArr
                sortedSlicesArr.forEach(function(slice) {
                    calculateRunnintTotal(sortedSlicesArr[0], slice)
                })
                renderFullCast(sortedSlicesArr, sortedSlicesArr.shift());
                //renderFullCast(sortedSlicesArr);
            })
    }

    var pauseReplay = function() {
        console.log('hitting pause')
        paused = true;
        $timeout.cancel(timerPromise);
        console.log("does pause change?", paused)
    }

    var continueReplay = function() {
        paused = false;
        renderFullCast(sortedSlicesArr, sortedSlicesArr.shift());
    }

    $scope.pauseContinue = function() {
        console.log('hitting pauseContinue')
        if (paused) {
            continueReplay();
        } else {
            pauseReplay();
        }
    }

     $scope.makeFork = function() {
        pauseReplay();
        $scope.forked = true;
        $scope.forkedText.text = $scope.videoObj.text;
        setTimeout(function () {
            $scope.$apply();
        }, 0);
      }

      $scope.saveFork = function(){
        castFactory.saveUserFork($scope.forkedText.text, $scope.replayId);
      }


});

