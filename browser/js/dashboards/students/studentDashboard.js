app.config(function ($stateProvider) {

    $stateProvider.state('studentDashboard', {
        url: '/studentDashboard/:userId',
        templateUrl: 'js/dashboards/students/studentDashboard.html',
        controller: 'studentDashboardCtrl'
    });

});

app.controller('studentDashboardCtrl', function ($scope, $state) {

    // $scope.credentials = {};

    // $scope.sendLogin = function (signUpInfo) {

    //     AuthService.signup(signUpInfo).then(function () {
    //         $state.go('home');
    //     }).catch(function () {
    //         $scope.error = 'Invalid login credentials.';
    //     });

    // };

});