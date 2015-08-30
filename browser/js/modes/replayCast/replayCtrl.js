app.controller('replayCtrl', function($scope, castFactory, $stateParams, $timeout) {
    $scope.videoObj = {text: null, result: null};
    var sortedSlicesArr;
    var replayCurrentIndex;
    var timer;
    var videoOver = true;
    var downloaded = false;
    var paused = false;
    var duration;
    var timelineWidth = 400;
    var aud = document.getElementById("audioRec"); 
    aud.addEventListener("timeupdate", timeUpdate, false);
    $scope.roomId = $stateParams.roomId;
    $scope.audio = aud;

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

    var restart = function() {
        var wait = sortedSlicesArr[replayCurrentIndex+1].runningTotal - aud.currentTime*1000;
        $timeout(function() {
            replayCurrentIndex = replayCurrentIndex+1;
            renderFullCast(sortedSlicesArr, replayCurrentIndex);
        }, wait);
    }

    //if user moves slider to a specific time, find the index of that slice to rerender the array  from there
    // var userUpdatingTime = function() {
    //     console.log('updating video')
    //     sortedSlicesArr.forEach(function(slice, index) {
    //         if(aud.currentTime >= slice.runningTotal/1000) {
    //             replayCurrentIndex = index;
    //         }
    //     })
    //     paused = false;
    //     restart();
    // }
    //since ng-change event continuously happens as long as user moves slider, debounce the function dependent on it
    //$scope.userUpdatingTime = _.debounce(userUpdatingTime, 250);


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
            aud.play();
            if(replayCurrentIndex < sortedSlicesArr.length -1){
                restart();
            }
        } else if(!paused) {
            paused = true;
            $timeout.cancel(timer)
            aud.pause();
        }
    }

    $scope.isPlayBack = function(){
        aud.play();
        $scope.playBack();
    }

    aud.onended = function() {
        videoOver = true;
    };

    function timeUpdate() {
        var playPercent = 100 * (aud.currentTime / duration);
        playhead.style.marginLeft = playPercent + "%";
    }
     
    //Gets audio file duration
    aud.addEventListener("canplaythrough", function () {
        duration = aud.duration;
    }, false);

     
    // returns click as decimal (.77) of the total timelineWidth
    function clickPercent(e) {
        return (e.pageX - timeline.offsetLeft) / timelineWidth;
    }

    $scope.updateVideo = function() {
        paused = true;
        $timeout.cancel(timer)
        aud.pause();
        moveplayhead(event);
        aud.currentTime = aud.duration * clickPercent(event);
         if(_.last(sortedSlicesArr).runningTotal < aud.currentTime*1000) {
                paused = false;
                $scope.videoObj.text = _.last(sortedSlicesArr).text;
                $scope.videoObj.result = _.last(sortedSlicesArr).result;
                aud.play();
                return;
        } 
        sortedSlicesArr.forEach(function(slice, index) {
            if(aud.currentTime*1000 > slice.runningTotal) {
                replayCurrentIndex = index;
            }
        })
        var wait = sortedSlicesArr[replayCurrentIndex+1].runningTotal - aud.currentTime*1000;
        paused = false;
        $scope.videoObj.text = null;
        $scope.videoObj.result = null;
        $timeout(function() {
            replayCurrentIndex = replayCurrentIndex+1;
            renderFullCast(sortedSlicesArr, replayCurrentIndex);
        }, wait);
        aud.play();


    }
 
    function moveplayhead(e) {
        var newMargLeft = e.pageX - timeline.offsetLeft; 
        if (newMargLeft == 0 && newMargLeft == timelineWidth) {
            playhead.style.marginLeft = newMargLeft + "px";
        }
        if (newMargLeft == 0) {
            playhead.style.marginLeft = "0px";
        }
        if (newMargLeft == timelineWidth) {
            playhead.style.marginLeft = timelineWidth + "px";
        }
    }


});














