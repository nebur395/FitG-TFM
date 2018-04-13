angular.module('fitGApp')

    .controller('exercisesCtrl', ['$scope', 'exerciseService', 'notificationService',
        function ($scope, exerciseService, notificationService) {

            // inputs visual variables
            $scope.aerobicExerciseList = [];
            $scope.anaerobicExerciseList = [];
            $scope.exerciseType = "Aerobic";

            $scope.changeExerciseType = function (type) {
                $scope.exerciseType = type;
            };

            $scope.getAerobicExerises = function () {
                exerciseService.getAerobics()
                    .then(exercises => {
                        $scope.aerobicExerciseList = exercises;
                    })
                    .catch(error => {
                        notificationService.showError('&#10008', error.message);
                    });
            };
            $scope.getAerobicExerises();

            $scope.getAnaerobicExerises = function () {
                exerciseService.getAnaerobics()
                    .then(exercises => {
                        $scope.anaerobicExerciseList = exercises;
                    })
                    .catch(error => {
                        notificationService.showError('&#10008', error.message);
                    });
            };
            $scope.getAnaerobicExerises();
        }]);
