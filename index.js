var http = require("http");
var fs = require("fs");

var my_module = require("./my_module.js");

http.createServer(function(request, response) {
	console.log("Wow! New connection!");
	
	//check module
	my_module.say_hello();
	
	response.writeHead(200, {"Content-Type": "text/html"});
	fs.readFile('app.html', function (err, data) {
		  if (err){console.log("Ошибка чтения файла")};
		  response.write(data);
		  response.end();
		  my_module.say_goodbye();
	});
}).listen(8888)
