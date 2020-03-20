var express = require('express');

var app = express();

app.set('view engine', 'jade');
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
	res.render("index");
});

app.get('/news.html', function(req, res) {
	res.render("news");
});

app.get('/rozklad.html', function(req, res) {
	res.render("rozklad");
});

app.get('/photo.html', function(req, res) {
	res.render("photo");
});

app.listen(3000);