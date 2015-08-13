app.factory('castFactory', function($http){
	return {
		sendText: function(text, time){
			return $http.post('api/live', {text: text, time: time})
			.then(function(res){
				return res.data;
			})
		},
		getCast: function(){
			return $http.get('/textStream')
			.then(function(res){
				return res.data;
			})
		}
	}
})