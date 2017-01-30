//setup dependencies
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// configuration
mongoose.connect(configDB.url); //database

require('./config/passport')(passport); //pass passport for configuration

//set up express app
app.use(morgan('dev')); // log each request to the console
app.use(cookieParser());// read cookies needed for auth
app.use(bodyParser());// get info from html forms

app.set('view engine', 'ejs'); // set ejs as templating engine
//required pasport
app.use(session({ secret: 'mmememememeilovememememephiiiiile'}));//session secret
app.use(passport.initialize());
app.use(passport.session()); // to make session persist
app.use(flash()); // for flash messages stored in session

/// routes
require('./app/routes.js')(app, passport);

// launch server
app.listen(port);
console.log('The magic happens on port ' + port);