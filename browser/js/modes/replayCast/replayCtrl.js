app.controller('replayCtrl', function($scope, $rootScope, $interval, castFactory, $stateParams, evaluatorFactory, $timeout) {
    $scope.paused = false;
    $scope.videoObj = {text: null};
    $scope.roomId = $stateParams.roomId;
    $scope.isAudio = false;

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

        $scope.videoObj.text = currentSlice.text;
        var next = sortedSlicesArr.shift();
                
        if(next && !paused){
            $timeout(function(){
                renderFullCast(sortedSlicesArr, next)
            }, next.runningTotal - currentSlice.runningTotal)
        } 

    };

    var calculateRunningTotal = function(first, slice) {
        return slice.runningTotal = Date.parse(slice.time) - Date.parse(first.time) + 1;
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
                renderFullCast(sortedSlicesArr, sortedSlicesArr.shift());
            })
    }
    var aud = document.getElementById("audioRec"); 

    var pauseReplay = function() {
        aud.pause();
        paused = true;
    }

    var continueReplay = function() {
        paused = false;
        aud.play();
        renderFullCast(sortedSlicesArr, sortedSlicesArr.shift());
    }

    $scope.pauseContinue = function() {
        if (paused) {
            continueReplay();
        } else {
            pauseReplay();
        }
    }

    $scope.isPlayBack = function(){
        $scope.isAudio = true;
    }

});

