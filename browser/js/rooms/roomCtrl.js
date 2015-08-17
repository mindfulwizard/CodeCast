app.controller('roomCtrl', function($scope, $rootScope, $state, socketFactory, roomFactory) {
    // $scope.rooms = [];
    // $scope.createRoom = function() {
    //     socketFactory.emit('createRoom', {
    //         name: this.roomName
    //     })
    // socket.on('give room to front-end', function(roomName) {
    //     console.log(roomName)
    //     $scope.rooms.push(roomName);
    //     console.log($scope.rooms);
    // })
    // $state.go('home');

    roomFactory.makeRoom($scope.roomName)
        .then(function() {
            console.log('room on the front end created');
        })

});