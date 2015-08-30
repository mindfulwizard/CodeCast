app.factory('evaluatorFactory', function($http) {
    return {
        evalCode: function(textSnip, $scope) {
            window.console = (function(origConsole) {
                if (!window.console)
                    console = {};
                var isDebug = false,
                    logArray = {
                        logs: [],
                        errors: [],
                        warns: [],
                        infos: []
                    }
                return {
                    log: function() {
                        logArray.logs.push(Array.prototype.slice.call(arguments));
                        var results = [];
                        logArray.logs.forEach(function(element) {
                            results.push(element)
                            $scope.$broadcast('console', results);
                        })

                    },
                    warn: function() {
                        logArray.warns.push(Array.prototype.slice.call(arguments))
                        isDebug && origConsole.warn && origConsole.warn.apply(origConsole, arguments);
                    },
                    error: function() {
                        logArray.errors.push(Array.prototype.slice.call(arguments))
                        isDebug && origConsole.error && origConsole.error.apply(origConsole, arguments);
                    },
                    info: function(v) {
                        logArray.infos.push(arguments)
                        isDebug && origConsole.info && origConsole.info.apply(origConsole, arguments);
                    },
                    debug: function(bool) {
                        isDebug = bool;
                    },
                    logArray: function() {
                        return logArray;
                    }
                };
            }(window.console));

            var script = document.createElement("script");
            script.type = "text/javascript";
            script.text = textSnip;
            document.body.appendChild(script);
        },
        liveEvals: []
    }
})