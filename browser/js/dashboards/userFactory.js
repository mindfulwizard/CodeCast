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
                console.log(res.data)
                return res.data
            })
        },
        getForks: function(){
              return $http.get('/api/forks')
             .then(function(res) {
                console.log(res.data)
                return res.data
            })
        }
    }
})