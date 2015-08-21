app.controller('replayCtrl', function($scope, $rootScope, $interval, castFactory, $stateParams, evaluatorFactory, $timeout) {
    $scope.paused = false;
    $scope.videoObj = {text: null, result: null};

    function sortSlices(sliceList) {
        return sliceList.sort(function(a, b) {
            if (a.time < b.time) return -1;
            if (a.time > b.time) return 1;
            return 0;
        })
    }

    var sortedSlicesArr;
    var replayCurrentIndex;
    var paused = false;

    var renderFullCast = function(sortedSlicesArr, currentIndex) {
        replayCurrentIndex = currentIndex;
        //console.log('currentSlicearr', sortedSlicesArr);
        var currentSlice = sortedSlicesArr[currentIndex];
        $scope.videoObj.text = currentSlice.text;
        $scope.videoObj.result = currentSlice.result;
        $scope.currentTime = currentSlice.runningTotal;
        var next = sortedSlicesArr[currentIndex+1];
                
        if(next && !paused){
            $timeout(function(){
                renderFullCast(sortedSlicesArr, currentIndex+1)
            }, next.runningTotal - currentSlice.runningTotal)
        } 

    };

    var calculateRunningTotal = function(first, slice) {
        return slice.runningTotal = Date.parse(slice.time) - Date.parse(first.time);
    }

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
                    calculateRunningTotal(sortedSlicesArr[0], slice)
                })
                $scope.replayLength = _.last(sortedSlicesArr).runningTotal;
                renderFullCast(sortedSlicesArr, 0);
            })
    }

    var pauseReplay = function() {
        paused = true;
    }

    var continueReplay = function() {
        paused = false;
        renderFullCast(sortedSlicesArr, replayCurrentIndex);
    }

    $scope.pauseContinue = function() {
        if (paused) {
            continueReplay();
        } else {
            pauseReplay();
        }
    }

    $scope.pauser = function(){
        paused = true;
    }

    // $scope.throttle = function(delay, callback) {
    //     console.log('throttle')
    //     var previousCall = new Date().getTime();
    //     return function() {
    //         var time = new Date().getTime();

    //     // if "delay" milliseconds have expired since
    //     // the previous call then propagate this call to
    //     // "callback"

    //         if ((time - previousCall) >= delay) {
    //             previousCall = time;
    //             callback.apply(null, arguments);
    //         }
    //     };
    // }


    var userUpdatingTime = function() {
        //paused = true;
        sortedSlicesArr.forEach(function(slice, index) {
            if($scope.currentTime >= slice.runningTotal) {
                replayCurrentIndex = index-1;
            }
        })
        console.log('ready to rerender')
        paused = false;
        renderFullCast(sortedSlicesArr, replayCurrentIndex);
    }


    $scope.userUpdatingTime = _.debounce(userUpdatingTime, 100);

});

















