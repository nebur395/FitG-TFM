angular.module('fitGApp')

// 'auth' service manage the authentication function of the page with the server
    .factory('authService', function ($state, $http, $base64, jwtHelper) {

        var _identity = undefined,
            _authenticated = false;

        return {
            //return true if the user is authenticated
            isAuthenticated: function () {
                if (_authenticated) {
                    return _authenticated;
                } else {
                    var tmp = angular.fromJson(localStorage.userIdentity);
                    if (typeof tmp !== 'undefined' && tmp !== null) {
                        this.authenticate(tmp);
                        return _authenticated;
                    } else {
                        return false;
                    }
                }
            },

            //authenticate the [identity] user
            authenticate: function (identity) {
                _identity = identity;
                _authenticated = (typeof identity !== 'undefined' && identity !== null);
                localStorage.userIdentity = angular.toJson(_identity);
            },

            //logout function
            logout: function () {
                _identity = undefined;
                _authenticated = false;
                localStorage.removeItem('userIdentity');
                $state.go('starter');
            },

            getUserObject: function () {
                if (typeof _identity !== 'undefined' && _identity !== null) {
                    return jwtHelper.decodeToken(_identity);
                } else {
                    return "";
                }
            },

            getUsername: function () {
                if (typeof _identity !== 'undefined' && _identity !== null) {
                    return jwtHelper.decodeToken(_identity).name;
                } else {
                    return "";
                }
            },

            getEmail: function () {
                if (typeof _identity !== 'undefined' && _identity !== null) {
                    return jwtHelper.decodeToken(_identity).email;
                } else {
                    return "";
                }
            },

            getAdmin: function () {
                if (typeof _identity !== 'undefined' && _identity !== null) {
                    return jwtHelper.decodeToken(_identity).admin;
                } else {
                    return "";
                }
            },

            getToken: function () {
                if (typeof _identity !== 'undefined' && _identity !== null) {
                    return _identity;
                } else {
                    return "";
                }
            },

            isTokenExpired: function () {
                if (typeof _identity !== 'undefined' && _identity !== null) {
                    return jwtHelper.isTokenExpired(_identity);
                } else {
                    return true;
                }
            },

            //send the login info to the server
            login: function (user, password, callbackError) {
                var that = this;
                $http({
                    method: 'GET',
                    url: 'login/',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Basic ' +
                        $base64.encode(user + ":" + password)
                    }
                }).then(function (successData) {
                    that.authenticate(successData.data.token);
                    $state.go('adminManagement');
                }, function (errorData) {
                    callbackError(errorData.data.message);
                });
            }
        };
    });
