app.config(function ($stateProvider) {


    $stateProvider.state('teacherDashboard', {
        url: '/teacherDashboard/:userId',
        templateUrl: 'js/dashboards/teachers/teacherDashboard.html',
        controller: 'teacherDashboardCtrl'
    });
    

    $stateProvider
    .state("teacherDashboard.overview", {
        url: "/overview",
        templateUrl: 'js/dashboards/students/overview.html',
        controller: 'studentDashboardCtrl'
    })
    .state("teacherDashboard.pastLectures", {
        url: "/pastLectures",
        templateUrl: 'js/dashboards/teachers/pastLectures.html',
        controller: 'teacherDashboardCtrl'
    })
    .state("teacherDashboard.futureLectures", {
        url: "/futureLectures",
        templateUrl: 'js/dashboards/teachers/futureLectures.html',
        controller: 'teacherDashboardCtrl'
    })
    

});

