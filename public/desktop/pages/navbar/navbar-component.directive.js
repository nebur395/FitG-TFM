angular.module('fitGApp')

    .controller('navbarCtrl', ['$scope', 'authService', function ($scope, authService) {

        $scope.home = "";
        $scope.logged = false;

        // Watches to control if the user is authenticated
        $scope.$watch(
            () => authService.isAuthenticated(),
            function () {
                $scope.logged = authService.isAuthenticated();
                $scope.home = $scope.logged ? "exercises" : "starter";
            });

        $scope.logout = function () {
            authService.logout();
        }
    }]);
