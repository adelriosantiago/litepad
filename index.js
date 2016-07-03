var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	fs = require('fs'),
	port = 4000;

app.listen(port);
console.log("Litepad running at port " + port);

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

var body = "Welcome to Litepad RTC Editor";

io.sockets.on('connection', function (socket) {
	socket.emit('refresh', { body: body });
	
	socket.on('refresh', function (body_) {
		body = body_;
	});
	
	socket.on('change', function (op) {
		console.log(op);
		if (op.origin == '+input' || op.origin == 'paste' || op.origin == '+delete') {
            socket.broadcast.emit('change', op);
		};
	});
});