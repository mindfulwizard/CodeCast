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

    //var sliceIndex;
    var renderPromise;
    var sortedSlicesArr;
    var diffArray = [];
    var videoInterval;

    function getTimeDiffs(sortedSlicesArr) {
        diffArray.push(0);
      for(var i = 0; i < sortedSlicesArr.length-1; i++) {
        diffArray.push(Date.parse(sortedSlicesArr[i+1].time) - Date.parse(sortedSlicesArr[i].time));
      }
      console.log("timediffs ", diffArray);
    }   

    function renderFullCast(sortedSlicesArr) {
        var diffArrIndex = 0;
        var sliceIndex = 0;
                // console.log("slicearr ", sortedSlicesArr);
                // console.log("slicearrindex ", sortedSlicesArr[sliceIndex]);

        // function recursivePlay(diffIndex, sliceIndex) {
        //     if (diffIndex === diffArray.length - 2) return;

        //     $timeout(function () {
        //         $scope.videoObj.text = sortedSlicesArr[sliceIndex].text;
        //         diffIndex++
        //         sliceIndex++
        //         recursivePlay(diffIndex, sliceIndex)
        //     }, diffArray[diffIndex])
        // }
        // recursivePlay(diffArrIndex, sliceIndex)

        // function writeWithTimeOut (diff) {
        //     $timeout(function () {
        //         $scope.videoObj.text = sortedSlicesArr[sliceIndex].text;
        //     }, diff)
        // }

        while(diffArrIndex < diffArray.length - 1) {
            var time = Date.now()
            var time2 = Date.now()
            // console.log('time.getTime()',time)
            // console.log('(new Date()).getTime()', Date.now())
            // console.log('new Date', D)
                while(time2 - time <= diffArray[diffArrIndex]) {
                    time2 = Date.now()
                    console.log('inner while loop')
                }
                console.log('outer while loop')
                $scope.videoObj.text = sortedSlicesArr[sliceIndex].text;
                //$scope.$digest();
                diffArrIndex++;
                sliceIndex++;
        }

        // code of this morning
        // while(diffArrIndex < diffArray.length - 1) {
        //     console.log("slicearrindex ", sortedSlicesArr[sliceIndex]);
        //     $timeout(function() {
        //         // if (sliceIndex === sortedSlicesArr.length - 1) {
        //             $scope.videoObj.text =
        //             sortedSlicesArr[sliceIndex].text;
        //             sliceIndex++;
        //         // }
        //     }, diffArray[diffArrIndex])
        //     diffArrIndex++;
        // }    

        // moduralize with timeout
        // function myCallback() {
        //     videoInterval = diffArray[diffArrIndex];
        //     diffArrIndex++;
        //     $scope.videoObj.text = sortedSlicesArr[sliceIndex].text;
        //     sliceIndex++;
        // }

        // while(diffArrIndex < diffArray.length) {
        //     $timeout(myCallback, videoInterval);
        // }



        // original code
        // sliceIndex = index || 0;
        // renderPromise = $interval(function() {
        //     $scope.videoObj.text = sortedSlices[sliceIndex].text;
        //     if(sortedSlices[sliceIndex].evaluated) {
        //         evaluatorFactory.evalCode($scope.videoObj.text, $scope);
        //     }

        //     sliceIndex++;
        //     if (sliceIndex === sortedSlices.length - 1) {
        //         sliceIndex = 0
        //     }
        // }, 500, sortedSlices.length - sliceIndex - 1)
    
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
                //get time diffs
                getTimeDiffs(sortedSlicesArr);
                //renderFullCast(sortedSlicesArr, sliceIndex);
                renderFullCast(sortedSlicesArr);
            })
    }

     var pauseReplay = function() {
        $scope.paused = true;
        $interval.cancel(renderPromise);
        renderPromise = undefined;
    }

    var continueReplay = function() {
        $scope.paused = false;
        // console.log(evaluatorFactory.readOnly);
        renderFullCast(sortedSlicesArr, sliceIndex - 1)
    }

    $scope.pauseContinue = function() {
        if ($scope.paused) {
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





