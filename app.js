var https = require('https');
var express = require('express');

var config = require('./config');

var app = express();

app.get('/v1/json/alert', function (req, response) {

  var message = req.query.message;

  var payload = {
    apiKey: config.opsGenie.apiKey,
    message: message
  };

  var options = {
    host: 'api.opsgenie.com',
    path: '/v1/json/alert',
    method: 'POST',
    port: 443
  };

  var request = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      response.json(JSON.parse(chunk));
    });
    res.on('error', function (err) {
      console.log(err);
    });
  });

  request.on('error', function (err) {
    //todo: proper error handling
    console.log(err);
  });

  request.write(JSON.stringify(payload));
  request.end();
});

app.listen(process.env.PORT || 3000);
