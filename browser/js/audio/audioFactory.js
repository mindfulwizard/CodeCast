// app.factory('audioFactory', function () {

// 	return {
// 		startRecording: function () {
// 			navigator.getUserMedia = navigator.getUserMedia ||
// 			                        navigator.webkitGetUserMedia ||
// 			                        navigator.mozGetUserMedia;

// 			if (navigator.getUserMedia) {
// 			  navigator.getUserMedia({ audio: true },
// 			  	successCb,
// 			     function(err) {
// 			        console.log("The following error occured: " + err.name);
// 			     }
// 			  );
// 			} else {
// 			  console.log("getUserMedia not supported");
// 			}
// 		}
// 	}


// 	successCb: function (e) {
// 		// creates an audio context
// 		audioContext = window.AudioContext || window.webkitAudioContext;
// 		context = new audioContext();

// 		// retrieve the current sample rate to be used for WAV packaging
//     	sampleRate = context.sampleRate;

//     	// creates a gain node
//    		volume = context.createGain();

//    		// creates an audio node from the microphone incoming stream
//     	audioInput = context.createMediaStreamSource(e);

//     	// connect the stream to the gain node
//     	audioInput.connect(volume);

//     	 /* From the spec: This value controls how frequently the audioprocess event is 
// 	    dispatched and how many sample-frames need to be processed each call. 
// 	    Lower values for buffer size will result in a lower (better) latency. 
// 	    Higher values will be necessary to avoid audio breakup and glitches */
// 	    var bufferSize = 2048;
// 	    recorder = context.createJavaScriptNode(bufferSize, 2, 2);

// 	}




// })





