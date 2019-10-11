'use strict';

var http = require('http');
http.createServer(function (request, response) {
    var os = require('os');
    var networkInterfaces = os.networkInterfaces();
    networkInterfaces["info"] = { "microservice": "true",
                                    "name": "service-6",
                                     "content": "Girls" };
    response.writeHead(200, { 'Content-type': 'text/html' });
    http.get(process.env['API'], (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            networkInterfaces['info.result'] = JSON.parse(data);
            response.write(JSON.stringify(networkInterfaces, undefined, 2));
            response.end();
        });

    }).on("error", (err) => {
        response.write(JSON.stringify(networkInterfaces, undefined, 2));
        response.end();
    });
}).listen(80);
