var express = require("express")
var app = express();

console.log("APP IS STARTING...");

function AppMiddleware(req, res, next) {
	console.log("Application Middleware");
	next();
}	

function RouteMiddleware(req, res, next) {
	console.log("Route Middleware");
	next();
}
app.use(AppMiddleware);

app.param("id", function(req, res, next) {
	console.log("app.param() // :id = " + req.params.id);
	next();
})
app.get("/user/*", function(req, res, next) {
	console.log("app.get(/user) callback");
	next();
})

app.get("/user/:id", RouteMiddleware, function(req, res) {
	console.log("app.get(/user/:id) callback");
	res.send("Response from server: OK")
});


app.listen(8888)
