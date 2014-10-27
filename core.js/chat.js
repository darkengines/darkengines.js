var app = require('app.js');

app.events.message = function (server, data) {
    wsServer.connections.forEach(function (c) {
        c.send(message.utf8Data);
    });
};