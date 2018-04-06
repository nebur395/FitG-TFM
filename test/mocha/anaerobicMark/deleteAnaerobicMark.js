var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken,
    anaerobicExerciseCommon = require('../../common/anaerobicExerciseCommon'),
    anaerobicMarkCommon = require('../../common/anaerobicMarkCommon'),
    feedbackMessageCommon = require('../../common/feedbackMessageCommon');

chai.use(chaiHttp);

/**
 * Test suite for anaerobic mark functionalities.
 */
describe('AnaerobicExercise', function () {

    var username = "Testing",
        email = "Testing@email.com",
        email2 = "Testing2@email.com",
        password = "Testing";

    var exercisesId = [],
        marksId = [],
        idUsers = [];

    var notExists = "Anaerobic mark does not exist.",
        invalidToken = "Invalid or non-existent token. Please, send a correct token.",
        invalidID = "Cast to ObjectId failed",
        successMessage = "Anaerobic mark deleted successfully.";

    /*
     * It creates some entities before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function (id) {
            idUsers.push(id);
            userCommon.createUser(username, email2, password, function(id) {
                idUsers.push(id);
                anaerobicExerciseCommon.createCustomAnaerobicExercise(idUsers[0], function (id) {
                    exercisesId.push(id);
                    anaerobicMarkCommon.createAnaerobicMark(exercisesId[0], idUsers[0], function(id){
                        marksId.push(id);
                        done();
                    });
                });
            });
        });
    });

    /**
     * Tests for anaerobicMark functionality.
     */
    describe('#deleteAnaerobicMark()', function () {

        it('should return an error message since the user isn\'t the owner of the mark', function (done) {

            chai.request(server)
                .delete('/anaerobicExercises/' + exercisesId[0] + '/anaerobicMarks/' + marksId[0])
                .set('Authorization','Bearer ' + createUserToken(idUsers[1], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 401, invalidToken);

                    done();
                });
        });

        it('should delete an existing anaerobic mark', function (done) {

            chai.request(server)
                .delete('/anaerobicExercises/' + exercisesId[0] + '/anaerobicMarks/' + marksId[0])
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 200, successMessage);
                    done();
                });
        });

        it('should return an error message since the mark doesn\'t exists', function (done) {

            chai.request(server)
                .delete('/anaerobicExercises/' + exercisesId[0] + '/anaerobicMarks/' + marksId[0])
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 404, notExists);

                    done();
                });
        });

        it('should return an error message since is not a valid mark id', function (done) {

            chai.request(server)
                .delete('/anaerobicExercises/' + exercisesId[0] + '/anaerobicMarks/' + '123')
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
                    anaerobicExerciseCommon.deleteAnaerobicExerciseById(exercisesId, function () {
                        anaerobicMarkCommon.deleteAnaerobicMarkById(marksId, done);
                    });
                });
            });
        });

    });
});
