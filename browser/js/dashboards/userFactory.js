app.factory('userFactory', function($http) {
    return {
         getInstructors: function() {
            return $http.get('/api/members')
                .then(function(res) {
                    return res.data
                })
        },
        getRoomsByInstructor: function(instructorId){
            return $http.get('/api/rooms/instructor/' + instructorId)
             .then(function(res) {
                return res.data
            })
        },
        getForks: function(){
              return $http.get('/api/forks')
             .then(function(res) {
                return res.data
            })
        },
        getUser: function(){
             return $http.get('/api/members/user')
             .then(function(res) {
                return res.data
            })
        }
    }
})