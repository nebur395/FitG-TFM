angular.module('fitGApp')

    .controller('starterCtrl', ['$scope', 'authService', 'notificationService',
        function ($scope, authService, notificationService) {

            // inputs visual variables
            $scope.email = "";
            $scope.password = "";

            // send the login form to the auth service
            $scope.login = function () {
                // Standard 'authorization basic'
                authService.login($scope.email, $scope.password, function (data) {
                    notificationService.showError('&#10008', data);
                });
            };
        }]);
