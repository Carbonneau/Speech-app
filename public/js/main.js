(function() {

  // Your custom JavaScript goes here
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

  if(params.canvas_width) {
      canvasWidth_input.value = params.canvas_width;
  }

  if(params.canvas_height) {
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
      if (!audioStream)
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
          }, function() {});
      else {
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

  var screen_constraints;

  function isCaptureScreen(callback) {
      if (document.getElementById('record-screen').checked) {
          document.getElementById('fit-to-screen').onclick();

          getScreenId(function (error, sourceId, _screen_constraints) {
              if(error === 'not-installed') {
                  window.open('https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk');
              }

              if(error === 'permission-denied') {
                  alert('Screen capturing permission is denied.');
              }

              if(error === 'installed-disabled') {
                  alert('Please enable chrome screen capturing extension.');
              }

              if(_screen_constraints) {
                  screen_constraints = _screen_constraints.video;
                  videoConstraints = _screen_constraints;
              }
              else {
                  videoConstraints = screen_constraints;
              }

              callback();
          });
      }
      else {
          callback();
      }
  }



  function recordVideoOrGIF(isRecordVideo) {navigator.getUserMedia(videoConstraints, function(stream) {video.onloadedmetadata = function() {
              video.width = canvasWidth_input.value || 320;
              video.height = canvasHeight_input.value || 240;

              var options = {
                  type: isRecordVideo ? 'video' : 'gif',
                  video: video,
                  canvas: {
                      width: canvasWidth_input.value,
                      height: canvasHeight_input.value
                  },
                  disableLogs: params.disableLogs || false,
                  recorderType: null // to let RecordRTC choose relevant types itself
              };

              recorder = window.RecordRTC(stream, options);
              recorder.startRecording();

              video.onloadedmetadata = false;
          };
          video.src = URL.createObjectURL(stream);
      }, function() {
          if (document.getElementById('record-screen').checked) {
              if (location.protocol === 'http:')
                  alert('<https> is mandatory to capture screen.');
              else
                  alert('Multi-capturing of screen is not allowed. Capturing process is denied. Are you enabled flag: "Enable screen capture support in getUserMedia"?');
          } else
              alert('Webcam access is denied.');
      });

      window.isAudio = false;

      if (isRecordVideo) {
          recordVideo.disabled = true;
          stopRecordingVideo.disabled = false;
          pauseResumeVideo.disabled = false;
      } else {
          recordGIF.disabled = true;
          stopRecordingGIF.disabled = false;
          pauseResumeGif.disabled = false;
      }
  }

  stopRecordingAudio.onclick = function() {
      this.disabled = true;
      recordAudio.disabled = false;
      audio.src = '';

      if (recorder)
          recorder.stopRecording(function(url) {
              audio.src = url;
              audio.muted = false;
              audio.play();

              document.getElementById('audio-url-preview').innerHTML = '<a href="' + url + '" target="_blank">Recorded Audio URL</a>';
          });
  };

  pauseResumeAudio.onclick = function() {
      if(!recorder) return;

      if(this.innerHTML === 'Pause') {
          this.innerHTML = 'Resume';
          recorder.pauseRecording();
          return;
      }

      this.innerHTML = 'Pause';
      recorder.resumeRecording();
  };




})();
