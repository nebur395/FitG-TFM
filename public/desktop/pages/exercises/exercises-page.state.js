angular.module('fitGApp')

    .controller('exercisesCtrl', ['$scope', 'aerobicExerciseService', 'notificationService',
        function ($scope, aerobicExerciseService, notificationService) {

            // inputs visual variables
            $scope.aerobicExerciseList = [];
            $scope.anaerobicExerciseList = [];
            $scope.exerciseType = "Aerobic";

            $scope.changeExerciseType = function (type) {
                $scope.exerciseType = type;
            };

            // send the login form to the auth service
            $scope.getAerobicExerises = function () {
                aerobicExerciseService.getExercises()
                    .then(exercises => {
                        $scope.aerobicExerciseList = exercises;
                    })
                    .catch(error => {
                        notificationService.showError('&#10008', error.message);
                    });
            };
            $scope.getAerobicExerises();


        }]);
