var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var model = mongoose.model('Usuario');

module.exports = function(app) {
    var api = {};

    api.autenticar = function(req, res) {
        model
            .findOne({login: req.body.login, senha: req.body.senha})
            .then(function(usuario) {
                if (!usuario) {
                    console.log('Login e senha inválidos');
                    res.sendStatus(401);
                } else {
                    var token = jwt.sign(usuario.login, app.get('secret'), {expiresIn: 84600});
                }
            }, function (error) {
                console.log(error);
                res.sendStatus(401);
            })
    };

    api.validarToken = function(req, res) {

    };

    return api;
};