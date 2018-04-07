angular.module('fitGApp')

    .controller('starterCtrl', ['$scope', 'authService', 'notificationService',
        function ($scope, authService, notificationService) {

            // inputs visual variables
            $scope.email = "";
            $scope.password = "";

            // send the login form to the auth service
            $scope.login = function () {
                var user = {
                    email: $scope.email,
                    password: $scope.password
                };
                // Standard 'authorization basic'
                authService.login(user, function (data) {
                    notificationService.showError('&#10008', data);
                });
            };
        }]);
