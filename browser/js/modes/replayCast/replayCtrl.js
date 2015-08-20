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

    var renderPromise;
    var sortedSlicesArr;
  
    // function myBind(func, array, object) {
    //     return function() {
    //         func(array, object);
    //     };
    // }

    $scope.getFullCast = function() {
        //get array of all codeSlices associated with a specific room
        return castFactory.getCast($stateParams.roomId)
            .then(function(sliceList) {
                //order array by time
                return sortSlices(sliceList);
            })
            .then(function(sortedArr) {
                var sortedSlicesArr = sortedArr;

                console.log('before map ', sortedSlicesArr);
                sortedSlicesArr.map(function(codeSlice) {
                    codeSlice.runningTotal = Date.parse(codeSlice.time) - Date.parse(sortedSlicesArr[0].time) + 1;
                })
                console.log('after map ', sortedSlicesArr);

                var renderFullCast = function(sortedSlicesArr, currentSlice) {
                    console.log('inside render ', sortedSlicesArr);
                   
                    $scope.videoObj.text = currentSlice.text;
                    var next = sortedSlicesArr.shift();
                
                    if(next){
                       //$timeout(myBind(renderFullCast, sortedSlicesArr, next), next.runningTotal - currentSlice.runningTotal);
                       //$timeout(renderFullCast(sortedSlicesArr, next), next.runningTotal - currentSlice.runningTotal);
                       $timeout(function(){
                            renderFullCast(sortedSlicesArr, next)
                        }, next.runningTotal - currentSlice.runningTotal)
                    } 

                };
                renderFullCast(sortedSlicesArr, sortedSlicesArr.shift());
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




    //var sliceIndex;
    // var diffArray = [];
    // var videoInterval;

    // function getTimeDiffs(sortedSlicesArr) {
    //     diffArray.push(0);
    //   for(var i = 0; i < sortedSlicesArr.length-1; i++) {
    //     diffArray.push(Date.parse(sortedSlicesArr[i+1].time) - Date.parse(sortedSlicesArr[i].time));
    //   }
    //   console.log("timediffs ", diffArray);
    // }   
  

        // var diffArrIndex = 0;
        // var sliceIndex = 0;
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

        // while(diffArrIndex < diffArray.length - 1) {
        //     var time = Date.now()
        //     var time2 = Date.now()
        //     // console.log('time.getTime()',time)
        //     // console.log('(new Date()).getTime()', Date.now())
        //     // console.log('new Date', D)
        //         while(time2 - time <= diffArray[diffArrIndex]) {
        //             time2 = Date.now()
        //             console.log('inner while loop')
        //         }
        //         console.log('outer while loop')
        //         $scope.videoObj.text = sortedSlicesArr[sliceIndex].text;
        //         //$scope.$digest();
        //         diffArrIndex++;
        //         sliceIndex++;
        // }

        // $scope.videoObj.text = currentSlice;
        // var nextSlice = sortedSlicesArr.shift();

        // if(nextSlice){
        //     $timeout(_.bind(renderFullCast, this, sortedSlicesArr, nextSlice), Date.parse(nextSlice.time) - Date.parse(sortedSlicesArr[0].time))
        // }

        


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
    


