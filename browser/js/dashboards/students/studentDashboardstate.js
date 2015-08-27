app.config(function ($stateProvider) {

    $stateProvider.state('studentDashboard', {
        url: '/studentDashboard/:userId',
        templateUrl: 'js/dashboards/students/studentDashboard.html',
        controller: 'studentDashboardCtrl'
    })
    .state("studentDashboard.overview", {
        url: "/overview",
        templateUrl: 'js/dashboards/students/overview.html',
        controller: 'studentDashboardCtrl'
    })
    .state("studentDashboard.instructorList", {
        url: "/instructorList",
        templateUrl: 'js/dashboards/students/instructorList.html',
        controller: 'studentDashboardCtrl'
    })
    .state("studentDashboard.liveList", {
        url: "/liveList",
        templateUrl: 'js/dashboards/students/liveList.html',
        controller: 'studentDashboardCtrl'
    })
    .state("studentDashboard.replayList", {
        url: "/replayList",
        templateUrl: 'js/dashboards/students/replayList.html',
        controller: 'studentDashboardCtrl'
    })
     .state("studentDashboard.forkList", {
        url: "/forkList",
        templateUrl: 'js/dashboards/students/forkList.html',
        controller: 'studentDashboardCtrl'
    })
});


    //     resolve: {
    //         getInstructors: function(userFactory){
    //             return userFactory.getInstructors();
    //     }
    // }
