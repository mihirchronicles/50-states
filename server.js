'use strict';
var express = require('express'),
    bodyParser = require('body-parser');

var app = express(),
    port = process.env.PORT_NUMBER || 8080;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//Endpoints

//DB