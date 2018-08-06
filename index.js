

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 5000

var room={}

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('join_room',function(data){
	//socket.emit('test',data)
	let d=JSON.parse(data);
	room[d.me]=socket.id;

	//socket.emit('test',room[d.me])
   })
   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
   socket.on('start_chat',function(message){
	let m=JSON.parse(message)
	let ob={
		to:m.to,
		sdp:m.sdp
	}
	//socket.emit('',connected[room[m.to]])
	let too=room[m.to];
   io.to(too).emit('chatting',JSON.stringify(m))
   })
});

http.listen(PORT, function() {
   console.log('listening on *:3000');
});
