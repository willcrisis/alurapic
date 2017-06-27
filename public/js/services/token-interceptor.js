angular.module('alurapic').factory('TokenInterceptor', function($window, $q, $location) {
    var factory = {};

    factory.response = function (response) {
        var token = response.headers('x-access-token');

        if (token) {
            $window.sessionStorage.token = token;
        }

        return response;
    };

    factory.request = function(request) {
        request.headers = request.headers || {};

        var token = $window.sessionStorage.token;
        if (token) {
            request.headers['x-access-token'] = token;
        }
        return request;
    };

    factory.responseError = function(rejection) {
        if (rejection && rejection.status == 401) {
            delete $window.sessionStorage.token;
            $location.path('/login')
        }
        return $q.reject(rejection);
    };

    return factory;
});