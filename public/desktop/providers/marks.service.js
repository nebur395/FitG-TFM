angular.module('fitGApp')

// 'marksService' service manage the authentication function of the page with the server
    .factory('marksService', function ($state, $http, API) {

        return {
            getAerobics: getAerobics,
            getAnaerobics: getAnaerobics
        };

        //send the login info to the server
        function getAerobics(exercise) {
            return $http({
                method: 'GET',
                url: API.GET_AEROBIC_EXERCISE_ENDPOINT + exercise + API.GET_AEROBIC_MARK_ENDPOINT,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(successData => {
                return successData.data.marks;
            }).catch(errorData => {
                throw new Error(errorData.data.message);
            });
        }

        //send the login info to the server
        function getAnaerobics(exercise) {
            return $http({
                method: 'GET',
                url: API.GET_ANAEROBIC_EXERCISE_ENDPOINT + exercise + API.GET_ANAEROBIC_MARK_ENDPOINT,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(successData => {
                return successData.data.marks;
            }).catch(errorData => {
                throw new Error(errorData.data.message);
            });
        }
    });
