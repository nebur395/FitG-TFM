angular.module('fitGApp')

// 'auth' service manage the authentication function of the page with the server
    .factory('authService', function ($state, $http, $base64, jwtHelper, API) {

        let _identity = undefined,
            _authenticated = false;

        return {
            isAuthenticated: isAuthenticated,
            authenticate: authenticate,
            logout: logout,
            getUserObject: getUserObject,
            getUsername: getUsername,
            getEmail: getEmail,
            getToken: getToken,
            isTokenExpired: isTokenExpired,
            login: login
        };


        //return true if the user is authenticated
        function isAuthenticated() {
            if (_authenticated) {
                return _authenticated;
            } else {
                const tmp = angular.fromJson(localStorage.userIdentity);
                if (typeof tmp !== 'undefined' && tmp !== null) {
                    this.authenticate(tmp);
                    return _authenticated;
                } else {
                    return false;
                }
            }
        }

        //authenticate the [identity] user
        function authenticate(identity) {
            _identity = identity;
            _authenticated = (typeof identity !== 'undefined' && identity !== null);
            localStorage.userIdentity = angular.toJson(_identity);
        }

        //logout function
        function logout() {
            _identity = undefined;
            _authenticated = false;
            localStorage.removeItem('userIdentity');
            $state.go('starter');
        }

        function getUserObject() {
            if (typeof _identity !== 'undefined' && _identity !== null) {
                return jwtHelper.decodeToken(_identity);
            } else {
                return "";
            }
        }

        function getUsername() {
            if (typeof _identity !== 'undefined' && _identity !== null) {
                return jwtHelper.decodeToken(_identity).name;
            } else {
                return "";
            }
        }

        function getEmail() {
            if (typeof _identity !== 'undefined' && _identity !== null) {
                return jwtHelper.decodeToken(_identity).email;
            } else {
                return "";
            }
        }

        function getToken() {
            if (typeof _identity !== 'undefined' && _identity !== null) {
                return _identity;
            } else {
                return "";
            }
        }

        function isTokenExpired() {
            if (typeof _identity !== 'undefined' && _identity !== null) {
                return jwtHelper.isTokenExpired(_identity);
            } else {
                return true;
            }
        }

        //send the login info to the server
        function login(user) {
            return $http({
                method: 'POST',
                url: API.AUTH_ENDPOINT,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                data: JSON.stringify(user)
            }).then(successData => {
                return successData.data.token;
            }).catch(errorData => {
                throw new Error(errorData.data.message);
            });
        }
    });
