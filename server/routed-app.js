var express = require('express');
var app = express();
var views = require('../business/views');

app.get('/', function (req, res) {
    res.send('root path');
});

app.get('/health', function (req, res) {
    res.send('OK!');
});

app.get('/tasks', views.tasks);

module.exports = app;
