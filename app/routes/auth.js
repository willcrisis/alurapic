module.exports = function(app) {

    var api = app.api.auth;

    app.get('/autenticar', api.autenticar);
    app.use('/*', api.validarToken);
};