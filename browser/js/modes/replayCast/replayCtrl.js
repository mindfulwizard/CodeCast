app.controller('replayCtrl', function($scope, $rootScope, $interval, castFactory, $stateParams, evaluatorFactory) {
    $scope.replayId = $stateParams.replayId;
    $scope.noEditing = true;
    $scope.paused = false;
    $scope.forked = false;
    $scope.replayText;

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
            $scope.replayText = sortedSlices[sliceIndex].text;
            if(sortedSlices[sliceIndex].evaluated) {
                $scope.getResultCode();
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

     var pauseReplay = function() {
        $scope.paused = true;
        $scope.noEditing = false;
        $interval.cancel(renderPromise);
        renderPromise = undefined;
    }

    var continueReplay = function() {
        $scope.paused = false;
        $scope.noEditing = true;
        renderFullCast(sortedSlices, sliceIndex - 1)
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
        evaluatorFactory.replayText = sortedSlices[sliceIndex-1].text;
    }
});





