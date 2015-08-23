app.factory('userFactory', function($http) {
    return {
         getInstructors: function() {
            return $http.get('/api/members')
                .then(function(res) {
                    return res.data
                })
        },
        getRoomsByInstructor: function(instructorId){
            return $http.get('/api/room/instructor' + instructorId)
             .then(function(res) {
                return res.data
            })
        },
        getForks: function(){
              return $http.get('/api/forks')
             .then(function(res) {
                return res.data
            })
        }
    }
})