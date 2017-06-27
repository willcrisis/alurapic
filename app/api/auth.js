var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var model = mongoose.model('Usuario');

module.exports = function(app) {
    var api = {};

    api.autenticar = function(req, res) {
        console.log('Autenticando');
        model
            .findOne({login: req.body.login, senha: req.body.senha})
            .then(function(usuario) {
                console.log(usuario);
                if (!usuario) {
                    console.log('Login e senha inválidos');
                    res.sendStatus(401);
                } else {
                    var token = jwt.sign({login: usuario.login}, app.get('secret'), {expiresIn: 84600});
                    res.set('x-access-token', token);
                    res.end();
                }
            }, function (error) {
                console.log(error);
                res.sendStatus(401);
            })
    };

    api.validarToken = function(req, res, next) {
        var token = req.headers['x-access-token'];
        if (!token) {
            res.sendStatus(401);
            return;
        }
        jwt.verify(token, app.get('secret'), function(err, decoded) {
            if (err) {
                console.log(err);
                res.sendStatus(401);
            }

            req.usuario = decoded;
            next();
        })
    };

    return api;
};