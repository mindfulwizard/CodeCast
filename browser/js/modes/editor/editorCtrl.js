app.controller('editorCtrl', function($scope, evaluatorFactory, castFactory, $stateParams, socketFactory){
	$scope.output;
    $scope.canEdit = false;
    $scope.editor;

    $scope.codemirrorLoaded = function(_editor){
        $scope.editor = _editor;
        //if in replay mode set readOnly to true
        if($scope.name === 'replay'  || !$scope.user.instructor) {
            $scope.editor.setOption('readOnly', 'nocursor');
        }
    }

    socketFactory.on('toggling editing permission to student', function(object) {
        console.log('hitting editorctrl', object.userId)
        if(($scope.editor && $scope.user._id === object.userId && !$scope.canEdit) || $scope.user.instructor) {
            console.log('can edit!')
            $scope.canEdit = true;
            $scope.editor.setOption('readOnly', false);
        } else {
            console.log('readOnly!');
            $scope.canEdit = false;
            $scope.editor.setOption('readOnly', 'nocursor');
        }
    })


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

    // console.log('user?', $scope.user);


    // $scope.allowUser = function(selectedStudent) {
    //     if($scope.editor && $scope.selectedStudent.canType) {
    //         console.log('can edit!')
    //         $scope.editor.setOption('readOnly', false);
    //     } else {
    //         console.log('readOnly!');
    //         $scope.editor.setOption('readOnly', 'nocursor');
    //     }
    // }



    // $scope.readOnly = false;
    // $scope.toggleReadOnly = function() {
    //     if ($scope.editor && $scope.readOnly === false) {
    //         console.log('readOnly!')
    //         $scope.readOnly = true;
    //         $scope.editor.setOption('readOnly', 'nocursor');
    //     } else if ($scope.editor && $scope.readOnly === true) {
    //         console.log('can edit!')
    //         $scope.readOnly = false;
    //         $scope.editor.setOption('readOnly', false);
    //     }
    // }

    $scope.$on('console', function(event, data) {
        // console.log($scope.replayText.text, new Date(), $stateParams.roomId, $scope.replayText.result)
        $scope.output = '\n' + data
        castFactory.sendText($scope.replayText.text, new Date(), $stateParams.roomId, $scope.output)
    })

    $scope.getResultCode = function() {
        evaluatorFactory.evalCode($scope.replayText.text, $scope);
    }
})