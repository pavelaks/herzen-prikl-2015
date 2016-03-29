var express = require('express');
var app = express();
var session = require('express-session')

app.use(session({
  secret: 'red-eye-linux',
  resave: true,
  saveUninitialized: true
  //store: MemoryStore
}))

function checkAuth(req, res, next) {
	
	if (req.session.auth != 'ok') {
		res.redirect('/signin');
	} 
	
	next();
}

app.get('/', function(req, res) {
	res.send('Hello!');
})

app.get('/signin', function(req, res) {
	res.send('Тут будет формочка для ввода пароля');
})

app.get('/auth/:login/:passw', function(req, res) {
	console.log(req.params.login + " " + req.params.passw )
	console.log(req.session.id)
	console.log(req.session.cookie)
	if (req.params.login == 'root' && req.params.passw == 'honeynmilk' ) { 
		req.session.auth = 'ok';
		req.session.login = req.params.login;
		
		res.redirect('/profile');
	} else	{
		res.redirect('/signin');
	}
})

app.get('/profile', checkAuth, function(req, res) {
	res.send('Добро пожаловать на страничку пользователя.');
})

app.listen(process.env.port || 8888, function () {
    console.log('Example app listening!');
});