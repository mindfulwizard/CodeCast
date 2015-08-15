app.controller('liveCtrl', function($scope, $interval, castFactory, $q, $document, $rootScope, socketFactory) {


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
         $scope.output = data.join(' ');
   })  
   

   var keystroke = false;
   var timerPromise;
   var replayId;

   $scope.startRecording = function() {

   		if(!keystroke) {
				keystroke = true;

            castFactory.createReplay()
            .then(function(replayId) {
            timerPromise = $interval(function(){
               console.log($scope.textSnip)
               castFactory.sendText($scope.textSnip, new Date(), replayId);
   			}, 500);
               
            })

   		}

   }

   $scope.startSharing = function () {
      socketFactory.emit('instructor writing', {my: 'data'})
      console.log('works on front end')
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
                   $rootScope.$broadcast('console', logArray.logs[0])
                 
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