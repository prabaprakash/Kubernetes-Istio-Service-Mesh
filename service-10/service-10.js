'use strict';

var http = require('http');
http.createServer(function (request, response) {
    var os = require('os');
    var networkInterfaces = os.networkInterfaces();
    networkInterfaces["info"] = {
        "microservice": "true",
        "name": "service-10",
        "content": "Wed"
    };
    response.writeHead(200, { 'Content-type': 'text/html' });
    response.write(JSON.stringify(networkInterfaces, undefined, 2));
    response.end();
}).listen(80);
