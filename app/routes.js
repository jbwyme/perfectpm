var express = require('express');
var path = require('path');
var Promise = require('bluebird');
var app = express();
var bodyParser = require('body-parser')
// var request = Promise.promisify(require('request'));
var request = require('request-promise');
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
    var projectPromise = backendRequest.get('/projects/' + req.params.id);
    var tasksPromise = backendRequest.get('/projects/' + req.params.id + '/tasks');
    Promise.props({project: projectPromise, tasks: tasksPromise})
    .then(function(results) {
        var projectJson = JSON.parse(results.project);
        projectJson.tasks = JSON.parse(results.tasks);
        res.send(projectJson);
    });
});

app.post('/api/projects', function(req, res) {
    backendRequest.post(
        '/projects',
        {json: req.body},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error);
            }
        }
    );
});


app.get('/api/projects/:projectId/tasks', function(req, res) {
    backendRequest.get(
        '/projects/' + req.params.projectId + '/tasks',
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

app.get('/api/orgs/:orgId', function(req, res) {
    backendRequest.get(
        '/orgs/' + req.params.orgId,
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

app.get('/api/orgs/:orgId/users', function(req, res) {
    backendRequest.get(
        '/orgs/' + req.params.orgId + '/users',
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

app.get('/api/orgs/:orgId/projects', function(req, res) {
    backendRequest.get(
        '/orgs/' + req.params.orgId + '/projects',
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

app.get('/api/users/:id', function(req, res) {
    var userPromise = backendRequest.get('/users/' + req.params.id);
    var tasksPromise = backendRequest.get('/users/' + req.params.id + '/tasks');
    var orgsPromise = backendRequest.get('/users/' + req.params.id + '/orgs');
    Promise.props({user: userPromise, tasks: tasksPromise, orgs: orgsPromise})
    .then(function(results) {
        var user = JSON.parse(results.user);
        user.orgs = JSON.parse(results.orgs);
        user.tasks = JSON.parse(results.tasks);
        res.send(user)
    });

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


app.get('/api/users/:userId/tasks', function(req, res) {
    backendRequest.get(
        '/users/' + req.params.userId + '/tasks',
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

module.exports = app;
