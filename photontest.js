var Particle = require('particle-api-js');
var particle = new Particle();


devicesPr.then(
  function(data){
    console.log('Device attrs retrieved successfully:', data);
  },
  function(err) {
    console.log('API call failed: ', err);
  }
);
