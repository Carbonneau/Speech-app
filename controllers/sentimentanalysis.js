var express = require('express')
var app = express();
var $ = require('jquery');


/**
 * GET /
 */
exports.index = function (dialogue) {

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://api.meaningcloud.com/sentiment-2.1",
    "method": "POST",
    "headers": {
      "content-type": "application/x-www-form-urlencoded"
    },
    "data": {
      "key": ,
      "lang": "en",
      "txt": dialogue,
      "model": "en"
    }
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  });


};
