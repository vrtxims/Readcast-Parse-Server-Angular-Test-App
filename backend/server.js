var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

var app = express();

var api = new ParseServer({
  appName: "TestApp",
  appId: "test-app",
  masterKey: "test-app-key",
  databaseURI: "mongodb://localhost/test-app",

  cloud: __dirname + "/cloud-code.js",
  publicServerURL: "http://localhost:1337/parse",

  verbose: true,
});

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://localhost:1337/parse",
      "appId": "test-app",
      "masterKey": "test-app-key",
      "appName": "TestApp"
    }
  ]
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

// Serve the Parse Dashoard on the /dashboard URL prefix
app.use('/dashboard', dashboard);

const port = 1337;
app.listen(port, function() {
  console.log('[ parse-server-test running on port ' + port + ' ]');
});