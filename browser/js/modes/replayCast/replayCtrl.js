app.controller('replayCtrl', function($scope, $rootScope, $interval, castFactory, $stateParams, evaluatorFactory) {
    $scope.replayId = $stateParams.replayId;
    $scope.paused = false;
    $scope.videoObj = {text: null};
    

    function sortSlices(sliceList) {
        return sliceList.sort(function(a, b) {
            if (a.time < b.time) return -1;
            if (a.time > b.time) return 1;
            return 0;
        })
    }

    var sliceIndex;
    var renderPromise;
    var sortedSlices;

    function renderFullCast(sortedSlices, index) {
        sliceIndex = index || 0;
        renderPromise = $interval(function() {
            $scope.videoObj.text = sortedSlices[sliceIndex].text;
            if(sortedSlices[sliceIndex].evaluated) {
                evaluatorFactory.evalCode($scope.videoObj.text, $scope);
            }

            sliceIndex++;
            if (sliceIndex === sortedSlices.length - 1) {
                sliceIndex = 0
            }
        }, 500, sortedSlices.length - sliceIndex - 1)
    }

    $scope.getFullCast = function() {
        return castFactory.getCast($scope.replayId)
            .then(function(sliceList) {
                return sortSlices(sliceList);
            })
            .then(function(sorted) {
                sortedSlices = sorted;
                renderFullCast(sortedSlices, sliceIndex);
            })
    }

     $scope.pauseReplay = function() {
        $scope.paused = true;
        // console.log(evaluatorFactory.readOnly);
        $interval.cancel(renderPromise);
        renderPromise = undefined;
    }

    var continueReplay = function() {
        $scope.paused = false;
        // console.log(evaluatorFactory.readOnly);
        renderFullCast(sortedSlices, sliceIndex - 1)
    }

    $scope.pauseContinue = function() {
        if ($scope.paused) {
            continueReplay();
        } else {
            pauseReplay();
        }
    }


});





