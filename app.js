// entry point to application

// dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var facebook = require('facebook-node-sdk');
var facebookConfig = require('./config/facebook');

// set up app
var app = express();

// port
app.set('port', process.env.PORT || 1337); // arbitrary port

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// load middleware
app.configure(function () {
    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(express.session({ secret: 'foo bar'}));
    app.use(require('stylus').middleware(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(facebook.middleware(facebookConfig));
});

// setup routes
// var routes = require('./routes');
// app.get('/', routes.index);
app.get('/', facebook.loginRequired(), function (req, res) {
    console.log('test');
    req.facebook.api('/me', function (err, user) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, ' + user.name + '!');
    });
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler - will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler - no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// export the app
module.exports = app;

// create server and listen for requests on specified port
http.createServer(app).listen(app.get('port'), function () {
    // log to stdout
    console.log('Express server listening on port ' + app.get('port'));
});