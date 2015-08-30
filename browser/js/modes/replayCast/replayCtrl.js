app.controller('replayCtrl', function($scope, castFactory, $stateParams, $timeout) {
    $scope.videoObj = {text: null, result: null};
    var sortedSlicesArr;
    var replayCurrentIndex;
    var timer;
    var videoOver = true;
    var downloaded = false;
    var paused = false;
    var aud = document.getElementById("audioRec"); 
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
        paused = false;
        renderFullCast(sortedSlicesArr, replayCurrentIndex);
    }

      var restart = function() {
        var wait = sortedSlicesArr[replayCurrentIndex+1].runningTotal - aud.currentTime*1000;
        $timeout(function() {
            replayCurrentIndex = replayCurrentIndex +1;
            renderFullCast(sortedSlicesArr, replayCurrentIndex)
        }, wait);
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
                videoOver = false;
                downloaded = true;
                $scope.isPlayBack();
                renderFullCast(sortedSlicesArr, 0);
            })
    }

    $scope.pauser = function(){
        aud.pause();
        paused = true;
    }

    $scope.pauseContinue = function() {
        if(videoOver){
            if(downloaded) {
                videoOver = false;
                renderFullCast(sortedSlicesArr, 0);
                aud.play();
            } else {
                $scope.getFullCast();
            }
        } else if(paused) {
            paused = false;
            restart();
            aud.play();
            //renderFullCast(sortedSlicesArr, replayCurrentIndex);
        } else if(!paused) {
            paused = true;
            $timeout.cancel(timer)
            aud.pause();
        }
    }

    $scope.isPlayBack = function(){
        aud.play();
        $scope.isAudio = true;
        $scope.playBack();
    }

    //since ng-change event continuously happens as long as user moves slider, debounce the function dependent on it
    $scope.userUpdatingTime = _.debounce(userUpdatingTime, 250);

    aud.onended = function() {
        videoOver = true;
    };
});














