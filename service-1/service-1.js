'use strict';


var http = require('http');

function createResponse(networkInterfaces) {
    let re = networkInterfaces;
    let res = [];
    while (typeof re["info.result"] !== "undefined") {
        res.push(re.info);
        re = re["info.result"];
    }
    res.push(re.info);
    return res;
}

http.createServer(function (request, response) {
    var os = require('os');
    var networkInterfaces = os.networkInterfaces();
    networkInterfaces["info"] = {
        "microservice": "true",
        "name": "service-1",
        "content": "Bright"
    };
    response.writeHead(200, { 'Content-type': 'text/html' });
    http.get("http://" + process.env['API'], (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            networkInterfaces['info.result'] = JSON.parse(data);
            response.write("<pre>" + JSON.stringify(createResponse(networkInterfaces), undefined, 2) + "</pre>");
            response.end();
        });

    }).on("error", (err) => {
        response.write("<pre>" + JSON.stringify(createResponse(networkInterfaces), undefined, 2) + "</pre>");
        response.end();
    });
}).listen(80);
