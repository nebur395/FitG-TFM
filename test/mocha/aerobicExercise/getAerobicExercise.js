var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken,
    aerobicExerciseCommon = require('../../common/aerobicExerciseCommon');

chai.use(chaiHttp);

/**
 * Test suite for aerobic exercise functionalities.
 */
describe('AerobicExercise', function () {

    var username = "Testing",
        email = "Testing@email.com",
        password = "Testing";

    var exercisesId = [],
        idUser;

    /*
     * It creates a new exercise before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function(id) {
            idUser = id;
            aerobicExerciseCommon.createCustomAerobicExercise(idUser, function (id) {
                exercisesId.push(id);
                done();
                });
        });

    });

    /**
     * Tests for aerobicExercise functionality.
     */
    describe('#getAerobicExercise()', function () {

        it('should get a list of exercises', function (done) {

            chai.request(server)
                .get('/aerobicExercises/')
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('exercises');
                    result.body.exercises.should.be.a('array');

                    done();
                });
        });

        it('should get an exercises', function (done) {

            chai.request(server)
                .get('/aerobicExercises/' + exercisesId[0])
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
