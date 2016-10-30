'use strict';
var express = require('express'),
    bodyParser = require('body-parser'),
    civic = require('./lib/services/civicService');

// Initiate App, body-parser and path to public
var app = express(),
    port = process.env.PORT_NUMBER || 8080;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Endpoints
app.post('/api/representatives', civic.getReps);

// Initiate Port
app.listen(port, function(){
   console.log('Hello ' + port);
});