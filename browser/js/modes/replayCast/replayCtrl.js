app.controller('replayCtrl', function($scope, $rootScope, $interval, castFactory, $stateParams, evaluatorFactory) {
    $scope.replayId = $stateParams.replayId;
    $scope.paused = false;
    $scope.forked = false;
    $scope.hasBeenForked = false;
    $scope.forks = [];
    $scope.showForks = false;
    //$scope.replayText;
    $scope.videoObj = {text: null};
    $scope.forkedText = {text: null};

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

     var pauseReplay = function() {
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

     $scope.makeFork = function() {
        pauseReplay();
        $scope.hasBeenForked = true;
        $scope.forked = true;
        $scope.forkedText.text = $scope.videoObj.text;
        setTimeout(function () {
            $scope.$apply();
        }, 0);
      }

      $scope.saveFork = function(){
        var name = window.prompt("What would you like to name your fork?", "My Fork")
        castFactory.saveUserFork(name, $scope.forkedText.text, $scope.replayId);
      }

    $scope.hideFork = function(){
        $scope.forked = false;
      }

     $scope.getForks = function(){
       castFactory.getUserForks($scope.replayId)
       .then(function(forks){
        $scope.forked = false;
            $scope.showForks = true;
            $scope.forks = forks;
       })
      
    }

    $scope.bringUpFork = function(forkText){
        $scope.showForks = false;
        $scope.forked = true;
        $scope.forkedText.text = forkText
    }

});





