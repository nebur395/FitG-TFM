var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken,
    aerobicExerciseCommon = require('../../common/aerobicExerciseCommon'),
    feedbackMessageCommon = require('../../common/feedbackMessageCommon');

chai.use(chaiHttp);

/**
 * Test suite for aerobic exercise functionalities.
 */
describe('AerobicExercise', function () {

    var username = "Testing",
        email = "Testing@email.com",
        email2 = "Testing2@email.com",
        password = "Testing";

    var exerciseName = "exercise test",
        exerciseName2 = "exercise test2",
        category = "running",
        type = "sprint";

    var exercisesId = [],
        idUsers = [];

    var notExists = "Aerobic exercise does not exist.",
        isNotCustom = "Predefined exercises can not be deleted.",
        invalidToken = "Invalid or non-existent token. Please, send a correct token.",
        invalidID = "Cast to ObjectId failed",
        successMessage = "Aerobic exercise deleted successfully.";

    /*
     * It creates a new exercise before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function (id) {
            idUsers.push(id);
            userCommon.createUser(username, email2, password, function(id) {
                idUsers.push(id);
                aerobicExerciseCommon.createAerobicExercise(exerciseName, category, type, true, idUsers[0], "", function (id) {
                    exercisesId.push(id);
                    aerobicExerciseCommon.createAerobicExercise(exerciseName2, category, type, false, idUsers[0], "", function(id){
                        exercisesId.push(id);
                        done();
                    });
                });
            });
        });
    });

    /**
     * Tests for aerobicExercise functionality.
     */
    describe('#createAerobicExercise()', function () {

        it('should return an error message since the user isn\'t the owner of the exercise', function (done) {

            chai.request(server)
                .delete('/aerobicExercises/' + exercisesId[0])
                .set('Authorization','Bearer ' + createUserToken(idUsers[1], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 401, invalidToken);

                    done();
                });
        });

        it('should delete an existing aerobic exercise', function (done) {

            chai.request(server)
                .delete('/aerobicExercises/' + exercisesId[0])
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 200, successMessage);
                    done();
                });
        });

        it('should return an error message since the exercise doesn\'t exists', function (done) {

            chai.request(server)
                .delete('/aerobicExercises/' + exercisesId[0])
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 404, notExists);

                    done();
                });
        });

        it('should return an error message since the exercise doesn\'t exists', function (done) {

            chai.request(server)
                .delete('/aerobicExercises/' + '123')
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 500, invalidID);

                    done();
                });
        });

        it('should return an error message since is not a custom exercise', function (done) {

            chai.request(server)
                .delete('/aerobicExercises/' + exercisesId[1])
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, isNotCustom);

                    done();
                });
        });

        /*
         * Removes the exercises created during the signIn tests.
         */
        after(function (done) {

            userCommon.deleteUserById(idUsers[0], function () {
                userCommon.deleteUserById(idUsers[1], function () {
                    aerobicExerciseCommon.deleteAerobicExerciseById(exercisesId, done);
                });
            });
        });

    });
});
