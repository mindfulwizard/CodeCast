app.controller('replayCtrl', function($scope, castFactory, $stateParams, $timeout) {
    $scope.videoObj = {text: null, result: null};
    var sortedSlicesArr;
    var replayCurrentIndex;
    var videoStarted = false;
    var videoOver = false;
    var paused = false;

    //custom sort to order codeSlices in array by timestamp
    var sortSlices = function(sliceList) {
        return sliceList.sort(function(a, b) {
            if (a.time < b.time) return -1;
            if (a.time > b.time) return 1;
            return 0;
        });
    }

    //add runningTotal property to each codeSlice = milliseconds relative to first slice in array
    var calculateRunningTotal = function(first, slice) {
        return slice.runningTotal = Date.parse(slice.time) - Date.parse(first.time);
    }

    var renderFullCast = function(sortedSlicesArr, currentIndex) {
        if(!paused){

            //index to start/restart playback
            replayCurrentIndex = currentIndex;
            //console.log('currentSlicearr', sortedSlicesArr);
            var currentSlice = sortedSlicesArr[replayCurrentIndex];

            //send currentSlice info to Angular to instantiate
            $scope.videoObj.text = currentSlice.text;
            $scope.videoObj.result = currentSlice.result;
            $scope.currentTime = currentSlice.runningTotal;

            var next = sortedSlicesArr[replayCurrentIndex+1];      
            if(next){
                //call renderFullCast recursively inside a timeout, passing in runningTotal diff as delay
                $timeout(function(){
                    renderFullCast(sortedSlicesArr, replayCurrentIndex+1)
                    //console.log(replayCurrentIndex)
                }, next.runningTotal - currentSlice.runningTotal)
            }
            else{
                videoOver = true;
            }
        }
    }

    //if user moves slider to a specific time, find the index of that slice to rerender the array  from there
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
                sortedSlicesArr = sortedArr;
                sortedSlicesArr.forEach(function(slice) {
                    calculateRunningTotal(sortedSlicesArr[0], slice);
                });

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
         if(videoOver){
            videoOver = false;
            renderFullCast(sortedSlicesArr, 0);
        } else if(!videoStarted){
            $scope.getFullCast();
        } else if(paused) {
            paused = false;
            renderFullCast(sortedSlicesArr, replayCurrentIndex);
        } else if(!paused) {
            paused = true;
        }
    }

    //since ng-change event continuously happens as long as user moves slider, debounce the function dependent on it
    $scope.userUpdatingTime = _.debounce(userUpdatingTime, 250);

});

















