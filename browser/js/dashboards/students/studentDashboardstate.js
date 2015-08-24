app.config(function ($stateProvider) {

    $stateProvider.state('studentDashboard', {
        url: '/studentDashboard/:userId',
        templateUrl: 'js/dashboards/students/studentDashboard.html',
        controller: 'studentDashboardCtrl',
    //     resolve: {
    //         getInstructors: function(userFactory){
    //             return userFactory.getInstructors();
    //     }
    // }
    })

});

