app.factory('forkFactory', function($http) {
    return {

        saveUserFork: function(forkName, forkedText, replayId) {
            return $http.post('/api/forks/' + replayId, {
                    name: forkName,
                    text: forkedText,
                    replayId: replayId
                })
                .then(function(res) {
                    return res.data;
                })
        },
        getUserForks: function(replayId) {
            return $http.get('/api/forks/' + replayId)
                .then(function(res) {
                    return res.data
                })
        }
    }
})