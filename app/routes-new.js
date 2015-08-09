var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser')
var request = require('request');
var backendRequest = request.defaults({baseUrl: "http://localhost:3333"});

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('layout');
});

app.get('/api/tasks', function (req, res) {
    backendRequest.get(
        '/tasks',
        {},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error)
            }
        }
    );
});

app.post('/api/tasks', function(req, res) {
    backendRequest.post(
        '/tasks',
        {json: req.body},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error)
            }
        }
    );
});

app.get('/api/projects', function(req, res) {
    backendRequest.get(
        '/projects',
        {},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error)
            }
        }
    );
})

app.get('/api/projects/:id', function(req, res) {
    backendRequest.get(
        '/projects/' + req.params['id'],
        {},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error)
            }
        }
    );
});

app.post('/api/projects', function(req, res) {
    backendRequest.post(
        '/projects',
        {json: req.body},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error)
            }
        }
    );
});

app.get('/api/users', function(req, res) {
    backendRequest.get(
        '/users',
        {},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error)
            }
        }
    );
});

app.post('/api/users', function(req, res) {
    backendRequest.post(
        {
            uri: '/users', 
            json: req.body
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error)
            }
        }
    );
});

module.exports = app;
