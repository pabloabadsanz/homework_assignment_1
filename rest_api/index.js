// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

var rest_api_server = http.createServer(function(req, res) {

  // Parse URL
  var parsedURL = url.parse(req.url, true);

  // Get the path from the URL
  var path = parsedURL.pathname;
  var trimmedpath = path.replace(/^\/+|\/+$/g,'');

  // Get the HTTP method
  var method = req.method.toLowerCase();

  // Get the query string
  var querystring = parsedURL.query;

  // Get the request headers
  var headersObject = req.headers;

  // Get the Payload, if there's any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function(data) {
    buffer += decoder.write(data);
  });
  req.on('end', function() {
    buffer += decoder.end();

    var chosenhandler = typeof(router[trimmedpath]) !== 'undefined' ? router[trimmedpath] : handlers.notFound;

    // Data object to be sent to handler
    var data = {
      'trimmedPath': trimmedpath,
      'queryStringObject': querystring,
      'method': method,
      'headers': headersObject,
      'payload': buffer
    }

    chosenhandler(data, function(statuscode, payload) {
      statuscode = typeof(statuscode) == 'number' ? statuscode : 200;

      payload = typeof(payload) == 'object' ? payload : {};

      // Convert the payload to string
      var payloadstring = JSON.stringify(payload);

      // Return the response
      res.writeHead(statuscode);
      res.end(payloadstring);

      console.log("Response:", statuscode, payloadstring);
    });

  });

});

// Start server listening on port 1234
rest_api_server.listen(1234, function() {
  console.log("REST API server listening on port 1234");
});

// Handlers
var handlers = {};

// Defining hello handler
handlers.hello = function(data, callback) {
  callback(200, {'msg': 'Welcome to my REST API!'});
};

// Defining not found handler
handlers.notfound = function(data, callback) {
  callback(404);
}

// Defining a request router
var router = {
  'hello': handlers.hello
}
