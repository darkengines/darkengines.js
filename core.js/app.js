var WebSocketServer = require('websocket').server;
var http = require('http');
var url = require('url');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var server = http.createServer(function (request, response) {

});
server.listen(1337, function () { });
var events = {};
var wsServer = new WebSocketServer({
    httpServer: server,
    maxReceivedFrameSize: 64000000
});
wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            message = JSON.parse(message.utf8Data);
            if (server.events.hasOwnProperty(message.event)) {
                events[message.event](wsServer, message.data);
            }
        }
    });
    
    connection.on('close', function (connection) {
    });
});