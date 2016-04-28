var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var users_model = require('./users.json');
  

var routes = require('./routes/index');
var users_routes = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("LocalStrategy: "+username + " is trying to login with password " + password);
    if (username in users_model && users_model[username] == password) {
       console.log("LocalStrategy: Hey " + username + "! Welcome to our app.");
       return done(null, users_model[username]);
  } else {
      console.log("LocalStrategy: I'll deny root to login");
      return done(null, false);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var ensurePassportAuthentificated = function (req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.error = 'Необходимо войти в систему';
    res.redirect('/login-form');
  } 
  return next();
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', { successRedirect: '/users', failureRedirect: '/login-form'}));
app.get('/login-form', function(req, res) {
  if (req.session.error) {
    var error_message = req.session.error;
  }
  res.render('login-form', {error: error_message})
});

app.get('/logout', function(req, res){
  console.log("LocalStrategy: GoodBye " + req.user + "! See you later...");
  req.logout();
  res.redirect('/');
});
app.use('/users',  ensurePassportAuthentificated, users_routes);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
