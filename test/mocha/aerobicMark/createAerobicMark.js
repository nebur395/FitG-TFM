var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    ObjectId = require('mongoose').Types.ObjectId,
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken,
    aerobicExerciseCommon = require('../../common/aerobicExerciseCommon'),
    aerobicMarkCommon = require('../../common/aerobicMarkCommon'),
    feedbackMessageCommon = require('../../common/feedbackMessageCommon');

chai.use(chaiHttp);

/**
 * Test suite for Aerobic Mark functionalities.
 */
describe('AerobicMark', function () {

    var username = "Testing",
        email = "Testing@email.com",
        password = "Testing";

    var exerciseName = "exercise test",
        category = "running",
        type = "sprint";

    var intensity = 1,
        distance = 1,
        time = 1,
        heartRate = 1;

    var exercisesId = [],
        marksId = [],
        idUser;

    var entityExist = "Unique key duplicated.";

    /*
     * It creates some entities before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function(id) {
            idUser = id;
            aerobicExerciseCommon.createAerobicExercise(exerciseName, category, type, false, idUser, "", function(id){
                exercisesId.push(id);
                done();
            });
        });

    });

    /**
     * Tests for anaerobicMark functionality.
     */
    describe('#createAerobicMark()', function () {

        it('should create a new aerobic mark', function (done) {

            chai.request(server)
                .post('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks')
                .send({intensity: intensity, distance: distance, time: time, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('mark');
                    result.body.mark.should.be.a('object');
                    result.body.mark.should.have.property('_id');
                    result.body.mark.should.have.property('intensity');
                    result.body.mark.should.have.property('distance');
                    result.body.mark.should.have.property('time');
                    result.body.mark.should.have.property('heartRate');
                    result.body.mark.should.have.property('idUser');
                    result.body.mark.should.have.property('idExercise');

                    marksId.push(new ObjectId(result.body.mark._id));

                    done();
                });
        });

        it('should return an error message since distance is blank', function (done) {

            chai.request(server)
                .post('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks')
                .send({intensity: intensity, distance: "", time: time, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "distance");

                    done();
                });
        });

        it('should return an error message since time is blank', function (done) {

            chai.request(server)
                .post('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks')
                .send({intensity: intensity, distance: distance, time: "", heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "time");

                    done();
                });
        });

        it('should return an error message since time is too short', function (done) {

            chai.request(server)
                .post('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks')
                .send({intensity: intensity, distance: distance, time: -1, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "time");

                    done();
                });
        });

        it('should return an error message since time is too long', function (done) {

            chai.request(server)
                .post('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks')
                .send({intensity: intensity, distance: distance, time: 1441, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "time");

                    done();
                });
        });

        it('should return an error message since distance is too short', function (done) {

            chai.request(server)
                .post('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks')
                .send({intensity: intensity, distance: -1, time: time, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "distance");

                    done();
                });
        });

        it('should return an error message since distance is too long', function (done) {

            chai.request(server)
                .post('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks')
                .send({intensity: intensity, distance: 3432, time: time, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "distance");

                    done();
                });
        });

        it('should return an error message since intensity is too short', function (done) {

            chai.request(server)
                .post('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks')
                .send({intensity: -1, distance: distance, time: time, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "intensity");

                    done();
                });
        });

        it('should return an error message since intensity is too long', function (done) {

            chai.request(server)
                .post('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks')
                .send({intensity: 11, distance: distance, time: time, heartRate: heartRate})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "intensity");

                    done();
                });
        });

        it('should return an error message since heartRate is too short', function (done) {

            chai.request(server)
                .post('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks')
                .send({intensity: intensity, distance: distance, time: time, heartRate: -1})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "heartRate");

                    done();
                });
        });

        it('should return an error message since heartRate is too long', function (done) {

            chai.request(server)
                .post('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks')
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
