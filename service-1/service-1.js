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

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



http.createServer(function (request, response) {
    var services = ['service-2',
        'service-3',
        'service-4',
        'service-5',
        'service-6',
        'service-7',
        'service-8',
        'service-9',
        'service-10'];
    var os = require('os');
    var networkInterfaces = os.networkInterfaces();
    networkInterfaces["info"] = {
        "microservice": "true",
        "name": "service-1",
        "content": "Bright"
    };
    response.writeHead(200, { 'Content-type': 'text/html' });
    services = shuffle(services);
    let call = services.pop();
    http.get("http://" + call + "/?services=" + services.toString(","), (resp) => {
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
