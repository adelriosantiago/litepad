var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	fs = require('fs');

var runAtPort = 4000;

app.listen(runAtPort);
console.log("Litepad running at port " + runAtPort);

function handler (req, res) {
	fs.readFile(__dirname + '/index.html',
	function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		
		res.writeHead(200);
		res.end(data);
	});
}

var socks = [];
var body = "Welcome to Litepad RTC Editor";

io.sockets.on('connection', function (socket) {
	socks.push(socket);
	socket.emit('refresh', {body: body});
	
	socket.on('refresh', function (body_) {
		console.log('new body');
		body = body_;
	});
	
	socket.on('change', function (op) {
		console.log(op);
		if (op.origin == '+input' || op.origin == 'paste' || op.origin == '+delete') {
			socks.forEach(function (sock) {
				if (sock != socket)
				sock.emit('change', op);
			});
		};
	});
});