app.factory('castFactory', function($http){
	return {
		sendText: function(text, time){
			console.log("text, time ", text, time);
			return $http.post('/textStream', {text: text, time: time})
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