var api = {};

var fotos = [
    {_id: 1, titulo: 'Leão', url: 'http://www.fundosanimais.com/Minis/leoes.jpg'},
    {_id: 2, titulo: 'Leão 2', url: 'http://www.fundosanimais.com/Minis/leoes.jpg'}
];

var CONTADOR = fotos.length;

api.listar = function (req, res) {
    res.json(fotos);
};

api.obter = function(req, res) {
    var foto = fotos.find(function(item) {
        return item._id == req.params.id;
    });
    res.json(foto);
};

api.excluir = function(req, res) {
    fotos = fotos.filter(function(item) {
        return item._id != req.params.id;
    });
    res.sendStatus(204);
};

api.incluir = function(req, res) {
    var foto = req.body;
    foto._id = ++CONTADOR;
    fotos.push(foto);
    res.json(foto);
};

api.editar = function(req, res) {
    var foto = fotos.findIndex(function(item) {
        return item._id == req.params.id;
    });

    fotos[foto] = req.body;

    res.json(req.body);
};

module.exports = api;

