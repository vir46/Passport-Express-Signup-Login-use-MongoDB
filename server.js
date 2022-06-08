var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var path = require('path');
var app = express();

// DB Connect
mongoose.connect('mongodb://127.0.0.1:27017/apiusers');

require('./app/passport.js')(passport);

// Setting Up
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(session({ 
    secret: 'github virtustan',
    resave: true,
    saveUninitialized: true
})); 
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); 

// Route
require('./app/route.js')(app, passport);

// Running App
app.listen(3000, function(){
   console.log('Whoops. It\'s working.');
});