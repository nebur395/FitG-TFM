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
                        $scope.sortExercises($scope.aerobicExerciseList);
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
                        $scope.sortExercises($scope.anaerobicExerciseList);
                    })
                    .catch(error => {
                        notificationService.showError('&#10008', error.message);
                    });
            };
            $scope.getAnaerobicExerises();

            $scope.enterAerobicExercise = function (exercise) {
                $state.go('aerobic-marks', { exID: exercise._id, exName: exercise.name});
            };

            $scope.enterAnaerobicExercise = function (exercise) {
                $state.go('anaerobic-marks', { exID: exercise._id, exName: exercise.name});
            };

            $scope.sortExercises = function (exerciseList) {
                exerciseList.sort(function(a,b) {
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    if (x < y) return -1;
                    if (x > y) return 1;
                    return 0;
                })
            }
        }]);
