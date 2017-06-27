module.exports = function(app) {

    var api = app.api.auth;

    app.post('/autenticar', api.autenticar);
    app.use('/*', api.validarToken);
};