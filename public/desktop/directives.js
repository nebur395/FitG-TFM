angular.module('fitGApp')

// include the 'navbar.html' into the <navbar> tag
    .directive('navbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'pages/navbar/navbar-component.directive.html',
            controller: 'navbarCtrl',
            scope: {}
        }
    });

