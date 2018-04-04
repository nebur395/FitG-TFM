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
describe('AnaerobicMark', function () {

    var username = "Testing",
        email = "Testing@email.com",
        password = "Testing";

    var exerciseName = "exercise test",
        category = "muscle training",
        type = "chest";

    var repetitions = [1,1],
        weight = [1,1],
        time = [1,1];

    var exercisesId = [],
        marksId = [],
        idUser;

    var successMessage = "Anaerobic mark updated successfully.";

    /*
     * It creates some entities before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function(id) {
            idUser = id;
            anaerobicExerciseCommon.createAnaerobicExercise(exerciseName, category, type, true, idUser, "", function (id) {
                exercisesId.push(id);
                anaerobicMarkCommon.createAnaerobicMark(exercisesId[0], idUser, repetitions, weight, time, "", function(id){
                    marksId.push(id);
                    done();
                });
            });
        });

    });

    /**
     * Tests for anaerobicMark functionality.
     */
    describe('#editAnaerobicMark()', function () {

        it('should edit an existing anaerobic mark', function (done) {

            chai.request(server)
                .put('/anaerobicExercises/' + exercisesId[0] + '/anaerobicMarks/' + marksId[0])
                .send({repetitions: repetitions, weight: weight, time: time})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 200, successMessage);
                    done();
                });
        });

        /*
         * Removes the entities created during the signIn tests.
         */
        after(function (done) {

            userCommon.deleteUserById(idUser, function () {
                anaerobicExerciseCommon.deleteAnaerobicExerciseById(exercisesId, function () {
                    anaerobicMarkCommon.deleteAnaerobicMarkById(marksId, done);
                });
            });
        });

    });
});
