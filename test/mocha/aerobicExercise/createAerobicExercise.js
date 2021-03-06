var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    ObjectId = require('mongoose').Types.ObjectId,
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken,
    aerobicExerciseCommon = require('../../common/aerobicExerciseCommon'),
    feedbackMessageCommon = require('../../common/feedbackMessageCommon');

chai.use(chaiHttp);

/**
 * Test suite for Aerobic Exercise functionalities.
 */
describe('AerobicExercise', function () {

    var username = "Testing",
        email = "Testing@email.com",
        password = "Testing";

    var exerciseName = "Custom aerobic exercise test",
        category = "running",
        type = "sprint";

    var exercisesId = [],
        idUser;

    var entityExist = "Unique key duplicated.";

    /*
     * It creates a new exercise before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function(id) {
            idUser = id;
            done();
        });

    });

    /**
     * Tests for anaerobicExercise functionality.
     */
    describe('#createAerobicExercise()', function () {

        it('should create a new aerobic exercise', function (done) {

            chai.request(server)
                .post('/aerobicExercises/')
                .send({name: exerciseName, category: category, type: type})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('exercise');
                    result.body.exercise.should.be.a('object');
                    result.body.exercise.should.have.property('_id');
                    result.body.exercise.should.have.property('name');
                    result.body.exercise.should.have.property('category');
                    result.body.exercise.should.have.property('type');
                    result.body.exercise.should.have.property('custom');
                    result.body.exercise.should.have.property('idUser');

                    exercisesId.push(new ObjectId(result.body.exercise._id));

                    done();
                });
        });

        it('should return an error message since the exercise already exists', function (done) {

            chai.request(server)
                .post('/aerobicExercises/')
                .send({name: exerciseName, category: category, type: type})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, entityExist);
                    done();
                });
        });

        it('should return an error message since name is blank', function (done) {

            chai.request(server)
                .post('/aerobicExercises/')
                .send({name: "", category: category, type: type})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "name");

                    done();
                });
        });

        it('should return an error message since category is blank', function (done) {

            chai.request(server)
                .post('/aerobicExercises/')
                .send({name: exerciseName, category: "", type: type})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "category");

                    done();
                });
        });

        it('should return an error message since type is blank', function (done) {

            chai.request(server)
                .post('/aerobicExercises/')
                .send({name: exerciseName, category: category, type: ""})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "type");

                    done();
                });
        });

        it('should return an error message since category is not valid', function (done) {

            chai.request(server)
                .post('/aerobicExercises/')
                .send({name: exerciseName, category: "category", type: type})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "category");

                    done();
                });
        });

        it('should return an error message since type is not valid', function (done) {

            chai.request(server)
                .post('/aerobicExercises/')
                .send({name: exerciseName, category: category, type: "type"})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "type");

                    done();
                });
        });

        /*
         * Removes the exercises created during the signIn tests.
         */
        after(function (done) {

            userCommon.deleteUserById(idUser, function () {
                aerobicExerciseCommon.deleteAerobicExerciseById(exercisesId, done);
            });
        });

    });
});
