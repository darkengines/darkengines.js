var WebSocketServer = require('websocket').server;
var http = require('http');
var url = require('url');

var server = http.createServer(function (request, response) {

});
server.listen(1337, function () {});
var wsServer = new WebSocketServer({
    httpServer: server,
    maxReceivedFrameSize: 64000000
});

wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log(message);
            wsServer.connections.forEach(function (c) {
                c.send(message.utf8Data);
            });
        }
    });
    
    connection.on('close', function (connection) {
    });
});