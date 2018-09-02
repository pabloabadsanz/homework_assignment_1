// Dependencies
var http = require('http');
var url = require('url');

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

  // Send the response
  res.end("Hello REST API client\n");

  // Log requested path
  console.log(method + " /" + trimmedpath + ' params:', querystring);
  console.log(headersObject);

});

// Start server listening on port 1234
rest_api_server.listen(1234, function() {
  console.log("REST API server listening on port 1234");
});
