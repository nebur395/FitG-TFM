angular.module('fitGApp', ['ui.router', 'base64', 'ui-notification', 'chart.js', 'angular-jwt'])

// Config UI-Notification angularjs module
    .config(function (NotificationProvider) {
        NotificationProvider.setOptions({
            positionX: 'center',
            //delay: null, // Uncomment for Protractor testing
            maxCount: 4
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        function checkIsLogged($state, authService){
            if (authService.isAuthenticated()) {
                $state.go('exercises');
            }
        }

        function checkIsNotLogged ($state, authService, notificationService) {
            if (!authService.isAuthenticated()) {
                notificationService.showError("Error de autenticación", "Token inválido" +
                    " o no existente. Por favor, envíe un token correcto.");
                $state.go('starter');
            }
        }

        $stateProvider

        // starter screen
            .state('starter', {
                url: "/starter",
                templateUrl: "pages/starter/starter-page.state.html",
                controller: "starterCtrl",
                onEnter: ['$state', 'authService', checkIsLogged]
            })

            // profile screen
            .state('exercises', {
                url: "/exercises",
                templateUrl: "pages/starter/exercises-page.state.html",
                controller: "exercisesCtrl",
                onEnter: ['$state', 'authService', 'notificationService', checkIsLogged]
            });

        $urlRouterProvider.otherwise('starter');
    })

    .config(['$httpProvider', function ($httpProvider) {
        /**
         *  HTTP Interceptor.
         *  Authorization JWT is sent in every request if exist.
         *  LogOut function is execute in every response if http 401.
         */
        $httpProvider.interceptors.push(['$q', '$injector', function ($q, $injector) {
            return {
                'request': function (config) {
                    var authService = $injector.get('authService');
                    config.headers = config.headers || {};
                    if (authService.getToken()) {
                        config.headers.Authorization = 'Bearer ' + authService.getToken();
                    }
                    return config;
                },
                'responseError': function (response) {

                    if (response.status === 401 || response.status === 403) {
                        var authService = $injector.get('authService');

                        if (authService.getToken() && authService.isTokenExpired()) {
                            authService.logout();
                        }
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }]);
