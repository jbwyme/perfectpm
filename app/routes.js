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

	// TODO: should be populated from db
    var createTask = function(name, description, estimate) {
        return {name: name, description: description, estimate: estimate}
    } 
    
    var tasks = [];
    for (var i = 0; i < 100; i++) {
        tasks.push(createTask("Task " + i, "Description for task " + i, 3));
    }
    res.send(JSON.stringify(tasks));
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
    // backendRequest.get(
    //     '/projects',
    //     {},
    //     function (error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             res.send(body);
    //         } else {
    //             res.send(error)
    //         }
    //     }
    // );

    // TODO: should be populated from db
    var createProject = function(name) {
        return {id: Math.floor(Math.random() * 10000000), name: name}
    } 
    
    var projects = [];
    for (var i = 0; i < 10; i++) {
        projects.push(createProject("My project"));
    }
    res.send(JSON.stringify(projects));
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
    // backendRequest.get(
    //     '/users',
    //     {},
    //     function (error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             res.send(body);
    //         } else {
    //             res.send(error)
    //         }
    //     }
    // );

    // TODO: should be populated from db
    var createUser = function(firstName, lastName, email) {
        return {id: Math.floor(Math.random() * 10000000), firstName: firstName, lastName: lastName, email: email}
    } 
    
    var users = [];
    for (var i = 0; i < 10; i++) {
        users.push(createUser("John", "Brown", "john.brown@gmail.com"));
    }
    res.send(JSON.stringify(users));
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
