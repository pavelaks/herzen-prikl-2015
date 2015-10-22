'use strict';
var express = require("express");  //Каталога node_modules и модуля Express нет в этом же уровне, но есть в родительских директориях.
var app = express();

var cutter = require('./url_base.js');

app.get("/:req_url", function(req, res) {
	var short_url = req.params.req_url;
	var full_url = cutter.getFullUrl(short_url);
	if (full_url)
		res.redirect(full_url);
	else
		res.send("404. Shortcut not found.");
	console.log("Request for short url: "+ req.params.req_url)
	//res.send("Hello! Check for url:" + req.params.req_url);
});


app.listen(8888)
