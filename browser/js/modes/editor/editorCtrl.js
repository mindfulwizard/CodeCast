app.controller('editorCtrl', function($scope, evaluatorFactory){
	$scope.output;

    console.log('replayText ', $scope.replayText);

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