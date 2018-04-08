angular.module('fitGApp')

// 'aerobicExerciseService' service manage the authentication function of the page with the server
    .factory('aerobicExerciseService', function ($state, $http, API) {

        return {
            getExercises: getExercises
        };

        //send the login info to the server
        function getExercises() {
            return $http({
                method: 'GET',
                url: API.GET_AEROBIC_EXERCISE_ENDPOINT,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(successData => {
                return successData.data.exercises;
            }).catch(errorData => {
                throw new Error(errorData.data.message);
            });
        }
    });
