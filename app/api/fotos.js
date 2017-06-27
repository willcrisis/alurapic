var mongoose = require('mongoose');
var model = mongoose.model('Foto');

var api = {};

api.listar = function (req, res) {

    model
        .find({})
        .then(function (fotos) {
            res.json(fotos);
        }, function (error) {
            console.log(error);
            res.status(500).json(error);
        });
};

api.obter = function (req, res) {
    model
        .findById(req.params.id)
        .then(function (foto) {
            if (!foto) {
                res.status(404);
                return;
            }
            ;
            res.json(foto);
        }, function (error) {
            console.log(error);
            res.status(500).json(error);
        });
};

api.excluir = function (req, res) {
    model
        .remove({_id: req.params.id})
        .then(function () {
            res.sendStatus(204);
        }, function (error) {
            console.log(error);
            res.status(500).json(error);
        });
};

api.incluir = function (req, res) {
    model
        .create(req.body)
        .then(function (foto) {
            res.json(foto);
        }, function (error) {
            console.log(error);
            res.status(500).json(error);
        });
};

api.editar = function (req, res) {
    model
        .findByIdAndUpdate(req.params.id, req.body)
        .then(function (foto) {
            res.json(foto);
        }, function (error) {
            console.log(error);
            res.status(500).json(error);
        });
};

module.exports = api;

