app.controller('editorCtrl', function($scope, evaluatorFactory){
	$scope.output;

	$scope.editorOptions = {
        lineWrapping: true,
        lineNumbers: true,
        mode: 'javascript',
        smartIndent: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        keyMap: 'sublime',
        // readOnly: false
    };

    //$scope.editorOptions.setOption("readOnly", true);

    $scope.output = 'waiting for results'

    $scope.$on('console', function(event, data) {
        $scope.output = '\n' + data
    })

    $scope.getResultCode = function() {
        evaluatorFactory.evalCode($scope.replayText.text, $scope);

        if($scope.name === 'live') {
            evaluatorFactory.liveEvals.push(new Date());
        }
    }
})