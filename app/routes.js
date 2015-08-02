var express = require('express');
var path = require('path');
var app = express();

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('layout');
});

app.get('/health', function (req, res) {
    res.send('OK!');
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

module.exports = app;
