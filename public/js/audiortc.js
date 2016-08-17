(function() {
    /**
     * URL PARAMETERS
     * @param  {[type]} function( [description]
     * @return {[type]}           [description]
     */
    (function() {
        var params = {},
            r = /([^&=]+)=?([^&]*)/g;

        function d(s) {
            return decodeURIComponent(s.replace(/\+/g, ' '));
        }

        var match, search = window.location.search;
        while (match = r.exec(search.substring(1)))
            params[d(match[1])] = d(match[2]);
        window.params = params;
    })();

    function getByID(id) {
        return document.getElementById(id);
    }

    var recordAudio = getByID('record-audio'),
        recordGIF = getByID('record-gif'),
        stopRecordingAudio = getByID('stop-recording-audio'),
        pauseResumeAudio = getByID('pause-resume-audio'),
        pauseResumeGif = getByID('pause-resume-gif'),
        stopRecordingGIF = getByID('stop-recording-gif');

    var canvasWidth_input = getByID('canvas-width-input'),
        canvasHeight_input = getByID('canvas-height-input');

    if (params.canvas_width) {
        canvasWidth_input.value = params.canvas_width;
    }

    if (params.canvas_height) {
        canvasHeight_input.value = params.canvas_height;
    }

    var audio = getByID('audio');

    var audioConstraints = {
        audio: true,
        video: false
    };

    var audioStream;
    var recorder;

    recordAudio.onclick = function() {
        if (!audioStream) {
            navigator.getUserMedia(audioConstraints, function(stream) {
                if (window.IsChrome) stream = new window.MediaStream(stream.getAudioTracks());
                audioStream = stream;
                /*
                            //audio streaming feature
                            var audioContext = window.AudioContext;
                            var context = new audioContext();
                            var audioInput = context.createMediaStreamSource(stream);
                            var bufferSize = 2048;
                            // create a javascript node
                            var recorder = context.createJavaScriptNode(bufferSize, 1, 1);
                            // specify the processing function
                            recorder.onaudioprocess = recorderProcess;
                            // connect stream to our recorder
                            audioInput.connect(recorder);
                            // connect our recorder to the previous destination
                            recorder.connect(context.destination);
                */
                // "audio" is a default type
                recorder = window.RecordRTC(stream, {
                    type: 'audio',
                    bufferSize: typeof params.bufferSize == 'undefined' ? 16384 : params.bufferSize,
                    sampleRate: typeof params.sampleRate == 'undefined' ? 44100 : params.sampleRate,
                    leftChannel: params.leftChannel || false,
                    disableLogs: params.disableLogs || false
                });
                recorder.startRecording();
                //console.log('audioStream', audioStream);
            }, function() {});

        } else {
            audio.src = URL.createObjectURL(audioStream);
            audio.muted = true;
            audio.play();
            if (recorder) recorder.startRecording();
        }

        window.isAudio = true;

        this.disabled = true;
        stopRecordingAudio.disabled = false;
        pauseResumeAudio.disabled = false;
    };

    stopRecordingAudio.onclick = function() {
        this.disabled = true;
        recordAudio.disabled = false;
        audio.src = '';

        if (recorder)
            recorder.stopRecording(function(url) {
                audio.src = url;
                audio.muted = false;
                //audio.play();

                var recordedBlob = recorder.getBlob();
                var buffer = recorder.buffer;

                recorder.getDataURL(function(dataURL) {
                  //console.log('data url', dataURL);
                });

                dataURL.then(function() {
                  $.post("/recognize",
                  {
                    buffer: buffer
                  }, function(data, status){
                          console.log("jquery post", status)
                          //alert("Data: " + data + "\nStatus: " + status);
                      })
                });

                document.getElementById('audio-url-preview').innerHTML = '<a href="' + url + '" target="_blank">Recorded Audio URL</a>';
            });
    };

    pauseResumeAudio.onclick = function() {
        if (!recorder) return;

        if (this.innerHTML === 'Pause') {
            this.innerHTML = 'Resume';
            recorder.pauseRecording();
            return;
        }

        this.innerHTML = 'Pause';
        recorder.resumeRecording();
    };

})();
