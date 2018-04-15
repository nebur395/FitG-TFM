angular.module('fitGApp')

    .controller('navbarCtrl', ['$scope', 'authService', function ($scope, authService) {

        $scope.logout = function () {
            authService.logout();
        }
    }]);
