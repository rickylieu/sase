/**
 * Introduction to Human-Computer Interaction
 * Lab 2
 * --------------
 * Created by: Michael Bernstein
 * Last updated: December 2013
 */
var PORT = 3000;

// Express is a web framework for node.js
// that makes nontrivial applications easier to build
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var sase = require('./routes/sase');


// Connect to the Mongo database, whether locally or on Heroku
var local_database_name = 'sase';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var uri = "mongodb://sase:saseislyfe@ds023478.mlab.com:23478/heroku_m9jc2gg9";
var database_uri = uri || local_database_uri;
mongoose.connect(database_uri);

// Create the server instance
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Return all pages in the /static directory
// whenever they are requested at '/'
// e.g., http://localhost:3000/index.html
// maps to /static/index.html on this machine
app.use(express.static(__dirname + '/static'));

// Add routes here
app.get('/', sase.view);
app.post('/add_event', sase.add_event);
app.post('/weeks', sase.get_event);
app.get('/calendar', sase.get_calendar);

// Start the server
var port = process.env.PORT || PORT; // 80 for web, 3000 for development
app.listen(port, function() {
	console.log("Node.js server running on port %s", port);
});

