app.directive('oauth', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/OAuthbuttons/oauth.html',
        scope: {
        	provider: '@'
        }
    };
});