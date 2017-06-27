module.exports = function(uri) {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://' + uri);

    mongoose.connection.on('connected', function() {
        console.log('conectou no banco')
    });

    mongoose.connection.on('disconnected', function() {
        console.log('desconectou do banco')
    });

    mongoose.connection.on('error', function(error) {
        console.log(error);
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('Terminou a aplicação');
            process.exit(0);
        });
    });
};

