var http = require("http");
var fs = require("fs");

http.createServer(function(request, response) {
	console.log("Wow! New connection!");
	response.writeHead(200, {"Content-Type": "text/html"});
	fs.readFile('app.html', function (err, data) {
		  if (err){console.log("Ошибка чтения файла")};
		  response.write(data);
		  response.end();
	});
}).listen(8888)
