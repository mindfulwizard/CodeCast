app.factory('commentsFactory', function($http) {
	return {
		getAllComments: function() {
			return $http.get('/api/comments')
				.then(function(res) {
					return res.data
				})
		}
	};
});