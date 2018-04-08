angular.module('fitGApp')

    .controller('starterCtrl', ['$scope', 'authService', 'notificationService',
        function ($scope, authService, notificationService) {

            // inputs visual variables
            $scope.email = "";
            $scope.password = "";

            // send the login form to the auth service
            $scope.login = function () {
                let user = {
                    email: $scope.email,
                    password: $scope.password
                };
                authService.login(user)
                    .then(token => {
                        //authService.authenticate(token);
                        //$state.go('adminManagement');
                        notificationService.showSuccess('&#10004', token);
                    })
                    .catch(error => {
                        notificationService.showError('&#10008', error.message);
                    });
            };
        }]);
