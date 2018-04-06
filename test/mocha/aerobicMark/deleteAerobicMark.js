var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken,
    aerobicExerciseCommon = require('../../common/aerobicExerciseCommon'),
    aerobicMarkCommon = require('../../common/aerobicMarkCommon'),
    feedbackMessageCommon = require('../../common/feedbackMessageCommon');

chai.use(chaiHttp);

/**
 * Test suite for aerobic mark functionalities.
 */
describe('AerobicExercise', function () {

    var username = "Testing",
        email = "Testing@email.com",
        email2 = "Testing2@email.com",
        password = "Testing";

    var exerciseName = "exercise test",
        category = "running",
        type = "sprint";

    var exercisesId = [],
        marksId = [],
        idUsers = [];

    var notExists = "Aerobic mark does not exist.",
        invalidToken = "Invalid or non-existent token. Please, send a correct token.",
        invalidID = "Cast to ObjectId failed",
        successMessage = "Aerobic mark deleted successfully.";

    /*
     * It creates some entities before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function (id) {
            idUsers.push(id);
            userCommon.createUser(username, email2, password, function(id) {
                idUsers.push(id);
                aerobicExerciseCommon.createAerobicExercise(exerciseName, category, type, true, idUsers[0], "", function (id) {
                    exercisesId.push(id);
                    aerobicMarkCommon.createAerobicMark(exercisesId[0], idUsers[0], function(id){
                        marksId.push(id);
                        done();
                    });
                });
            });
        });
    });

    /**
     * Tests for aerobicMark functionality.
     */
    describe('#deleteAerobicMark()', function () {

        it('should return an error message since the user isn\'t the owner of the mark', function (done) {

            chai.request(server)
                .delete('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + marksId[0])
                .set('Authorization','Bearer ' + createUserToken(idUsers[1], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 401, invalidToken);

                    done();
                });
        });

        it('should delete an existing aerobic mark', function (done) {

            chai.request(server)
                .delete('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + marksId[0])
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 200, successMessage);
                    done();
                });
        });

        it('should return an error message since the mark doesn\'t exists', function (done) {

            chai.request(server)
                .delete('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + marksId[0])
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 404, notExists);

                    done();
                });
        });

        it('should return an error message since is not a valid mark id', function (done) {

            chai.request(server)
                .delete('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + '123')
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 500, invalidID);

                    done();
                });
        });

        /*
         * Removes the entities created during the signIn tests.
         */
        after(function (done) {

            userCommon.deleteUserById(idUsers[0], function () {
                userCommon.deleteUserById(idUsers[1], function () {
                    aerobicExerciseCommon.deleteAerobicExerciseById(exercisesId, function () {
                        aerobicMarkCommon.deleteAerobicMarkById(marksId, done);
                    });
                });
            });
        });

    });
});
