app.controller('editorCtrl', function($scope, evaluatorFactory, $rootScope){

	$scope.editorOptions = {
        lineWrapping: true,
        lineNumbers: true,
        mode: 'javascript',
        smartIndent: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        keyMap: 'sublime'
    };

    $scope.output = 'waiting for results'

    $scope.$on('console', function(event, data) {
        $scope.output = '\n' + data
    })

    $scope.getResultCode = function() {
        evaluatorFactory.evalCode(evaluatorFactory.replayText, $rootScope);
    }


})