var express = require("express")
var app = express();

app.get("/", function(req, res) {
res.sendFile(__dirname + '/app.html');
});
app.get("/hello", function(req, res) {res.send("Hello!")});
app.get("/goodbye", function(req, res) {res.send("Goodbye!")});
app.get("/%D0%BF%D1%83%D1%82%D1%91%D0%BC", function(req, res) {res.redirect(307,'http://путём.рф/')});

app.listen(8888)
