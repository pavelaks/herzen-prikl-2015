var http = require("http");

http.createServer(function(request, response) {
	console.log("Wow! New connection!");
	response.writeHead(200, {"Content-Type": "text/plain"});
	setTimeout(
		function() {
			response.write("Timeout callback executed. Close connection.");
			response.end();
		}, 10000)
	
}).listen(8888)