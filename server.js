var express = require('express'),
	stylus = require('stylus'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

//Manage the Node environment variable 
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//Some Express configurations
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

//In replace to express.logger('dev')
app.use(logger('dev'));
//In replace to express.bodyParser()
app.use(bodyParser.urlencoded({
	extended: true
}));

//Create the compile function to pass to Stylus pré-processor
function compile(str, path) {
	return stylus(str).set('filename', path);
}

//Some Stylus configurations
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));

app.use(express.static(__dirname + '/public'));

//MongoDB Connection
mongoose.connect('mongodb://localhost/testdb');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error ...'));
db.once('open', function callback() {
	console.log('testdb opened');
});

//Routes
app.get('/partials/:partialPath', function (req, res) {
	res.render('partials/' + req.params.partialPath);
});

app.get('*', function (req, res) {
	res.render('index');
});

var port = 3030;

app.listen(port);
console.log('Listening to the port ' + port + ' ...');