var express = require('express');
var app = express();
var consign = require('consign');
var bodyParser = require('body-parser');

app.set('secret', 'teste1234');

app.use(express.static('./public'));
app.use(bodyParser.json());

consign({cwd: 'app'})
    .include('models')
    .then('api')
    .then('routes/auth')
    .then('routes')
    .into(app);

module.exports = app;