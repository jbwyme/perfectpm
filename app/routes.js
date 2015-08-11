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

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('layout');
});

app.post('/api/register', function(req, res) {
    backendRequest.post('/register', {json: req.body}, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            res.send(body);
        } else {
            res.send(err)
        }
    });
});

app.get('/api/login/:email', function(req, res) {
    backendRequest.get('/auth/' + req.params.email, {}, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            res.send(body);
        } else {
            res.send(err)
        }
    });
});

app.get('/api/tasks', function(req, res) {
    backendRequest.get(
        '/tasks',
        {},
        function (err, response, body) {
            if (!err && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(err)
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


app.put('/api/tasks/:taskId', function(req, res) {
    backendRequest.put(
        '/tasks/' + req.params.taskId,
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

app.get('/api/projects/:projectId', function(req, res) {
    backendRequest.get(
        '/projects/' + req.params.projectId,
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
                res.send(error);
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

app.get('/api/orgs/:orgId/users/:userId', function(req, res) {
    backendRequest.get(
        '/orgs/' + req.params.orgId + '/users/' + req.params.userId,
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

app.get('/api/task_list/:taskListId', function(req, res) {
    backendRequest.get(
        '/task_list/' + req.params.taskListId,
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

app.post('/api/task_list/:taskListId/tasks/:taskId', function(req, res) {
    backendRequest.post(
        '/task_list/' + req.params.taskListId + '/tasks/' + req.params.taskId,
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

app.put('/api/task_list/:taskListId/tasks/:taskId', function(req, res) {
    backendRequest.put(
        '/task_list/' + req.params.taskListId + '/tasks/' + req.params.taskId,
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

app.get('/api/users/:id', function(req, res) {
    var userPromise = backendRequest.get('/users/' + req.params.id);
    var orgsPromise = backendRequest.get('/users/' + req.params.id + '/orgs');
    Promise.props({user: userPromise, orgs: orgsPromise})
    .then(function(results) {
        var user = JSON.parse(results.user);
        user.orgs = JSON.parse(results.orgs);
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

app.post('/api/users/:userId/tasks/:taskId', function(req, res) {
    backendRequest.post(
        '/users/' + req.params.userId + '/tasks/' + req.params.taskId,
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

module.exports = app;
