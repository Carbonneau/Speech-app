(function() {
  // Your custom JavaScript goes here


    $('#stop-recording-audio').click( function(event){
      console.log("jquery", buffer)
      $.post("/recognize",
      {
        buffer: buffer
      }, function(data, status){
              alert("Data: " + data + "\nStatus: " + status);
          })
    })
});
