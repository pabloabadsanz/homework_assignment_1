// Dependencies
var http = require('http');
var url = require('url');

var rest_api_server = http.createServer(function(req, res) {

  // Parse URL
  var parsedURL = url.parse(req.url, true);

  // Get the path from the URL
  var path = parsedURL.pathname;
  var trimmedpath = path.replace(/^\/+|\/+$/g,'');

  // Send the response
  res.end("Hello REST API client\n");

  // Log requested path
  console.log("REQUEST " + trimmedpath);

});

// Start server listening on port 1234
rest_api_server.listen(1234, function() {
  console.log("REST API server listening on port 1234");
});
