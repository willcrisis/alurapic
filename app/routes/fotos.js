module.exports = function (app) {
    var api = app.api.fotos;

    app.route('/v1/fotos')
        .get(api.listar)
        .post(api.incluir);

    app.route('/v1/fotos/:id')
        .get(api.obter)
        .put(api.editar)
        .delete(api.excluir);
};