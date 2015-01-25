var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/v1/json/alert', function (req, response) {
  console.log(req.body);

  var apiKey = req.body.apiKey;
  var message = req.body.message;

  console.log(apiKey, message);

  var payload = {
    apiKey: apiKey,
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
