var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var $ = require('jquery');


/**
 * GET /
 */
exports.index = function(req, res) {
  res.render('testmeeting', {
    title: 'testmeeting'
  });
};


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
