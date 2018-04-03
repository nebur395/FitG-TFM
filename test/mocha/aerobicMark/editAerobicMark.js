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
describe('AerobicMark', function () {

    var username = "Testing",
        email = "Testing@email.com",
        password = "Testing";

    var exerciseName = "exercise test",
        exerciseName2 = "exercise test2",
        category = "running",
        type = "sprint";

    var intensity = 1,
        distance = 1,
        time = 1,
        heartRate = 1;

    var exercisesId = [],
        marksId = [],
        idUser;

    var successMessage = "Aerobic mark updated successfully.";

    /*
     * It creates some entities before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function(id) {
            idUser = id;
            aerobicExerciseCommon.createAerobicExercise(exerciseName, category, type, true, idUser, "", function (id) {
                exercisesId.push(id);
                aerobicMarkCommon.createAerobicMark(exercisesId[0], idUser, distance, time, intensity, heartRate, "", function(id){
                    marksId.push(id);
                    done();
                });
            });
        });

    });

    /**
     * Tests for aerobicMark functionality.
     */
    describe('#editAerobicMark()', function () {

        it('should edit an existing aerobic mark', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + marksId[0])
                .send({intensity: intensity, distance: distance, time: time, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 200, successMessage);
                    done();
                });
        });

        it('should return an error message since distance is blank', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + marksId[0])
                .send({intensity: intensity, distance: "", time: time, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "distance");

                    done();
                });
        });

        it('should return an error message since time is blank', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + marksId[0])
                .send({intensity: intensity, distance: distance, time: "", heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "time");

                    done();
                });
        });

        it('should return an error message since time is too short', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + marksId[0])
                .send({intensity: intensity, distance: distance, time: -1, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "time");

                    done();
                });
        });

        it('should return an error message since time is too long', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + marksId[0])
                .send({intensity: intensity, distance: distance, time: 1441, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "time");

                    done();
                });
        });

        it('should return an error message since distance is too short', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + marksId[0])
                .send({intensity: intensity, distance: -1, time: time, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "distance");

                    done();
                });
        });

        it('should return an error message since distance is too long', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + marksId[0])
                .send({intensity: intensity, distance: 3432, time: time, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "distance");

                    done();
                });
        });

        it('should return an error message since intensity is too short', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + marksId[0])
                .send({intensity: -1, distance: distance, time: time, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "intensity");

                    done();
                });
        });

        it('should return an error message since intensity is too long', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + marksId[0])
                .send({intensity: 11, distance: distance, time: time, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "intensity");

                    done();
                });
        });

        it('should return an error message since heartRate is too short', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + marksId[0])
                .send({intensity: intensity, distance: distance, time: time, heartRate: -1})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "heartRate");

                    done();
                });
        });

        it('should return an error message since heartRate is too long', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + marksId[0])
                .send({intensity: intensity, distance: distance, time: time, heartRate: 226})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "heartRate");

                    done();
                });
        });

        /*
         * Removes the exercises created during the signIn tests.
         */
        after(function (done) {

            userCommon.deleteUserById(idUser, function () {
                aerobicExerciseCommon.deleteAerobicExerciseById(exercisesId, function () {
                    aerobicMarkCommon.deleteAerobicMarkById(marksId, done);
                });
            });
        });

    });
});
