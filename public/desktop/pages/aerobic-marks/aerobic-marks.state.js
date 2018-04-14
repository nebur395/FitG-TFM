angular.module('fitGApp')

    .controller('aerobicMarksCtrl', ['$scope', '$stateParams', 'marksService', 'notificationService',
        function ($scope, $stateParams, marksService, notificationService) {

            // inputs visual variables
            $scope.marksList = [];

            $scope.isEmpty = function () {
                return $scope.marksList.length === 0;
            };

            $scope.formatDates = function (marks) {
                for (let i = 0; i < marks.length; i++) {
                    marks[i].date = marks[i].creationDate.slice(0, 10);
                    marks[i].time = marks[i].creationDate.slice(11, 16);
                }
            };

            $scope.getMarks = function () {
                marksService.getAerobics($stateParams.mark)
                    .then(marks => {
                        $scope.formatDates(marks);
                        $scope.marksList = marks;
                    })
                    .catch(error => {
                        notificationService.showError('&#10008', error.message);
                    });
            };
            $scope.getMarks();

        }]);
