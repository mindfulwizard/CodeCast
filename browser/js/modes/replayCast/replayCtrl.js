app.controller('replayCtrl', function($scope, castFactory, $stateParams, $timeout) {
    var sortedSlicesArr;
    var replayCurrentIndex;
    var paused = false;
    var videoStarted = false;
    $scope.videoObj = {text: null, result: null};

    var sortSlices = function(sliceList) {
        return sliceList.sort(function(a, b) {
            if (a.time < b.time) return -1;
            if (a.time > b.time) return 1;
            return 0;
        })
    }

    var calculateRunningTotal = function(first, slice) {
        return slice.runningTotal = Date.parse(slice.time) - Date.parse(first.time);
    }

    var renderFullCast = function(sortedSlicesArr, currentIndex) {
        if(!paused){
            replayCurrentIndex = currentIndex;
            //console.log('currentSlicearr', sortedSlicesArr);
            var currentSlice = sortedSlicesArr[replayCurrentIndex];
            $scope.videoObj.text = currentSlice.text;
            $scope.videoObj.result = currentSlice.result;
            $scope.currentTime = currentSlice.runningTotal;
            var next = sortedSlicesArr[replayCurrentIndex+1];
                  
            if(next){
                $timeout(function(){
                    renderFullCast(sortedSlicesArr, replayCurrentIndex+1)
                    console.log(replayCurrentIndex)
                }, next.runningTotal - currentSlice.runningTotal)
            } 
        }
    };

    var userUpdatingTime = function() {
        sortedSlicesArr.forEach(function(slice, index) {
            if($scope.currentTime >= slice.runningTotal) {
                replayCurrentIndex = index;
            }
        })
        //console.log('rerendering')
        paused = false;
        renderFullCast(sortedSlicesArr, replayCurrentIndex);
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
                if(!videoStarted){
                    //console.log('starting')
                    renderFullCast(sortedSlicesArr, 0);
                    videoStarted = true;
                }    
            })
    }
    
    $scope.pauser = function(){
        paused = true;
    }

    $scope.pauseContinue = function() {
        if(!videoStarted){
            $scope.getFullCast();
        }
        else if(videoStarted && paused) {
            paused = false;
            renderFullCast(sortedSlicesArr, replayCurrentIndex);

        } else if(videoStarted && !paused) {
            $scope.pauser();
        }
    }

    $scope.userUpdatingTime = _.debounce(userUpdatingTime, 300);

});

















