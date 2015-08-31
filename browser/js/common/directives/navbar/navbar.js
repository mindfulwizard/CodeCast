app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        controller: function($scope) {
            $scope.scroll = 0;
        },
        templateUrl: 'js/common/directives/navbar/navbar.html',


        link: function(scope) {

            scope.items = [{
                label: 'Home',
                state: 'home'
            }, {
                label: 'About',
                state: 'about'
            }, {
                label: 'Instructor DashBoard',
                state: 'teacherDashboard.overview',
                auth: true,
                instructor: true
            }, {
                label: 'Student DashBoard',
                state: 'studentDashboard.overview',
                auth: true,
                student: true
            }];

            scope.user = null;

            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            scope.isInstructor = function() {
                return AuthService.isInstructor();
            };

            scope.isAdmin = function() {
                return AuthService.isAdmin();
            };


            scope.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('home');
                });
            };

            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user;
                });
            };

            var removeUser = function() {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});