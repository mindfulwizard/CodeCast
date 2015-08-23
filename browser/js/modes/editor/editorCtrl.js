app.controller('editorCtrl', function($scope, evaluatorFactory, castFactory, $stateParams){
	$scope.output;

	// $scope.editorOptions = {
 //        lineWrapping: true,
 //        lineNumbers: true,
 //        mode: 'javascript',
 //        smartIndent: true,
 //        autoCloseBrackets: true,
 //        matchBrackets: true,
 //        keyMap: 'sublime',
 //        onLoad: codemirrorLoaded
 //    };

    // $scope.output = 'waiting for results'

    $scope.editor;

    $scope.codemirrorLoaded = function(_editor){
        $scope.editor = _editor;
        //if in replay mode set readOnly to true
        if($scope.name === 'replay'  || !$scope.user.instructor) {
            $scope.editor.setOption('readOnly', 'nocursor');
        }
    }

    console.log('user?', $scope.currentUser)
    $scope.readOnly = false;

    $scope.toggleReadOnly = function() {
        if ($scope.editor && $scope.readOnly === false) {
            console.log('readOnly!')
            $scope.readOnly = true;
            $scope.editor.setOption('readOnly', 'nocursor');
        } else if ($scope.editor && $scope.readOnly === true) {
            console.log('can edit!')
            $scope.readOnly = false;
            $scope.editor.setOption('readOnly', false);
        }
    }

    $scope.$on('console', function(event, data) {
        // console.log($scope.replayText.text, new Date(), $stateParams.roomId, $scope.replayText.result)
        $scope.output = '\n' + data
        castFactory.sendText($scope.replayText.text, new Date(), $stateParams.roomId, $scope.output)
    })

    $scope.getResultCode = function() {
        evaluatorFactory.evalCode($scope.replayText.text, $scope);
    }
})