app.factory('forkFactory', function($http) {
    return {

        saveUserFork: function(forkName, forkedText, roomId) {
            return $http.post('/api/forks/' + roomId, {
                    name: forkName,
                    text: forkedText,
                    roomId: roomId
                })
                .then(function(res) {
                    return res.data;
                })
        },
        getUserForks: function(roomId) {
            return $http.get('/api/forks/' + roomId)
                .then(function(res) {
                    return res.data
                })
        }
    }
})