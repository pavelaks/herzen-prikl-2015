var http = require("http");

http.createServer(function(request, response) {
	console.log("Wow! New connection!");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("OK.");
	response.end();
	
}).listen(8888)