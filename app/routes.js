var express = require('express');
var path = require('path');
var app = express();

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('layout');
});

app.get('/health', function (req, res) {
    res.send('OK!');
});

module.exports = app;
