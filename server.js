var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, "./static")));

var server = app.listen(8000, function(){
	console.log("Players listening on port 8000");
})