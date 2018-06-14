var http = require('http');
var fs = require('fs');
var count = 0;

var server = http.createServer(function (req, res) {
  fs.readFile('./index.html', function (error, data) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(data, 'utf-8');
  });
}).listen(3000, "127.0.0.1");
console.log('Server running at http://127.0.0.1:3000/');

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  count++;
  console.log('User connected' + count + 'user(s) present');

  socket.emit('users', {
    number: count
  });
  socket.broadcast.emit('users', {
    number: count
  });

  socket.on('message', function (data) {
    console.log(12321312321, data, 888888)
    io.sockets.emit('push message', data);

  });

  socket.on('disconnect', function () {
    count--;
    console.log('User disconnected');
    socket.broadcast.emit('users', {
      number: count
    });
  });
});