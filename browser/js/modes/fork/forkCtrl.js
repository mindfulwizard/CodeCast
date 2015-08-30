app.controller('forkCtrl', function($scope, forkFactory) {
    $scope.showEnd = false;
    $scope.forked = false;
    $scope.hasBeenForked = false;
    $scope.forks = [];
    $scope.showForks = false;
    $scope.forkedText = {
        text: null
    };
    $scope.fork = 'fork';


    $scope.makeFork = function() {
        // if($scope.name !== "live") {
        //     $scope.pauseContinue()
        // }
        $scope.hasBeenForked = true;
        $scope.forked = true;
        $scope.forkedText.text = $scope.replayObj.text;
        setTimeout(function() {
            $scope.$apply();
        }, 0);
    }

    $scope.saveFork = function() {
        var name = window.prompt("What would you like to name your fork?", "My Fork")
        forkFactory.saveUserFork(name, $scope.forkedText.text, $scope.roomId);
    }

    $scope.hideFork = function() {
        $scope.forked = false;
    }

    $scope.getForks = function() {
        forkFactory.getUserForks($scope.roomId)
            .then(function(forks) {
                $scope.forked = false;
                $scope.showForks = true;
                $scope.forks = forks;
            })

    }

    $scope.bringUpFork = function(forkText) {
        $scope.showForks = false;
        $scope.forked = true;
        $scope.forkedText.text = forkText
    }

})
