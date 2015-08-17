app.controller('liveCtrl', function($scope, $interval, castFactory, $q, $document, $rootScope, socketFactory) {


  socketFactory.on('change the textSnip', function (obj) {

    $scope.textSnip = obj.data
  })

   $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        mode: 'javascript',
        smartIndent: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        keyMap: 'sublime'
    };

   $scope.output = 'waiting for results'

   $scope.$on('console', function(event, data) {
         $scope.output = '\n' + data
   })  
   

   var keystroke = false;
   var timerPromise;
   var replayId;

   $scope.startRecording = function() {
    // console.log('startRecording')

   		if(!keystroke) {
				keystroke = true;

            castFactory.createReplay()
            .then(function(replayId) {
            timerPromise = $interval(function(){
               // console.log($scope.textSnip)
               castFactory.sendText($scope.textSnip, new Date(), replayId);
   			}, 500);
               
            })

   		}

   }

   $scope.startSharing = function () {
    // console.log('start sharing')
      socketFactory.emit('instructor writing', {data: $scope.textSnip})
   }

   $scope.endInterval = function() {
         $interval.cancel(timerPromise);
   }


   $scope.getResultCode = function (){

         window.console=(function(origConsole){
         // $scope.output = 'nothing yet';
                      // console.log('the output')
                if(!window.console)
                  console = {};
                var isDebug=false,
                logArray = {
                  logs: [],
                  errors: [],
                  warns: [],
                  infos: []
                }
             return {
                 log: function(){
                   logArray.logs.push(Array.prototype.slice.call(arguments));
                   origConsole.log && origConsole.log.apply(origConsole,arguments);
                   // $scope.output += logArray.logs[0];
                   var results = [];
                   logArray.logs.forEach(function (element) {
                    results.push(element)
                      $rootScope.$broadcast('console', results);
                   })
                 
                 },
                 warn: function(){
                   logArray.warns.push(Array.prototype.slice.call(arguments))
                   isDebug && origConsole.warn && origConsole.warn.apply(origConsole,arguments);
                   // $scope.output += logArray.warns[0];
                 },
                 error: function(){
                   logArray.errors.push(Array.prototype.slice.call(arguments))
                   isDebug && origConsole.error && origConsole.error.apply(origConsole,arguments);
                   // $scope.output += logArray.errors[0];
                 },
                 info: function(v){
                   logArray.infos.push(arguments)
                   isDebug && origConsole.info && origConsole.info.apply(origConsole,arguments);
                 },
                 debug: function(bool){
                   isDebug = bool;
                 },
                 logArray: function(){
                   return logArray;
                 }
             };
      }(window.console));

            var script = document.createElement("script");
            script.type = "text/javascript";
            script.text =  $scope.textSnip;
            document.body.appendChild(script);
         }










});