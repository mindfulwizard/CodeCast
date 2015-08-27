
app.controller('replayCtrl', function($scope, castFactory, $stateParams, $timeout) {
    $scope.videoObj = {text: null, result: null};
    var sortedSlicesArr;
    var replayCurrentIndex;
    var timer;
    var videoDownloaded = false;
    var videoOver = false;
    var paused = false;
    $scope.roomId = $stateParams.roomId;
    $scope.isAudio = false;

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
            var currentSlice = sortedSlicesArr[replayCurrentIndex];

            //send currentSlice info to Angular to instantiate
            $scope.videoObj.text = currentSlice.text;
            $scope.videoObj.result = currentSlice.result;
            $scope.currentTime = currentSlice.runningTotal;

            var next = sortedSlicesArr[replayCurrentIndex+1];      
            if(next){
                //call renderFullCast recursively inside a timeout, passing in runningTotal diff as delay
                timer = $timeout(function(){
                    renderFullCast(sortedSlicesArr, replayCurrentIndex+1)
                }, next.runningTotal - currentSlice.runningTotal)
            } else{
                replayCurrentIndex = 0;
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

    //   var restart = function() {
    //     var wait = sortedSlicesArr[replayCurrentIndex].runningTotal - aud.currentTime*1000;
    //     console.log('wait', wait)
    //     aud.play();
    //     console.log('audio restart time', aud.currentTime*1000)
    //     console.log('slice restart time', sortedSlicesArr[replayCurrentIndex].runningTotal)
    //     $timeout(function() {
    //         renderFullCast(sortedSlicesArr, replayCurrentIndex)
    //     }, wait);
    // }

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
                if(!videoDownloaded){
                    $scope.isPlayBack();
                    renderFullCast(sortedSlicesArr, 0);
                    videoDownloaded = true;
                }    
            })
    }

    var aud = document.getElementById("audioRec"); 

    $scope.pauser = function(){
        aud.pause();
        paused = true;
    }

    $scope.pauseContinue = function() {
         if(videoOver){
            videoOver = false;
            aud.play();
            renderFullCast(sortedSlicesArr, 0);
        } else if(!videoDownloaded){
            $scope.getFullCast();
        } else if(paused) {
            paused = false;
            aud.play();
            renderFullCast(sortedSlicesArr, replayCurrentIndex);
        } else if(!paused) {
            paused = true;
            aud.pause();
        }
    }

    $scope.isPlayBack = function(){
        $scope.isAudio = true;
         $scope.playBack();
    }

    //since ng-change event continuously happens as long as user moves slider, debounce the function dependent on it
    $scope.userUpdatingTime = _.debounce(userUpdatingTime, 250);


});

















