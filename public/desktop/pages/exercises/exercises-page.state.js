angular.module('fitGApp')

    .controller('exercisesCtrl', ['$scope', '$state', 'exerciseService', 'notificationService',
        function ($scope, $state, exerciseService, notificationService) {

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

            $scope.enterAerobicExercise = function (id) {
                $state.go('aerobic-marks', { mark: id});
            };

            $scope.enterAnaerobicExercise = function (id) {
                $state.go('aerobic-marks', { mark: id});
            }
        }]);
