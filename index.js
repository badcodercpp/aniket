

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 5000

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');

   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});

http.listen(PORT, function() {
   console.log('listening on *:3000');
});
