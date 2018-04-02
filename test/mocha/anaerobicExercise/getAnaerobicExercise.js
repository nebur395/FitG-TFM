var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken,
    anaerobicExerciseCommon = require('../../common/anaerobicExerciseCommon');

chai.use(chaiHttp);

/**
 * Test suite for anaerobic exercise functionalities.
 */
describe('AnaerobicExercise', function () {

    var username = "Testing",
        email = "Testing@email.com",
        password = "Testing";

    var exerciseName = "exercise test",
        category = "muscle training",
        type = "chest";

    var exercisesId = [],
        idUser;

    /*
     * It creates a new exercise before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function(id) {
            idUser = id;
            anaerobicExerciseCommon.createAnaerobicExercise(exerciseName, category, type, true, idUser, "", function (id) {
                exercisesId.push(id);
                done();
                });
        });

    });

    /**
     * Tests for anaerobicExercise functionality.
     */
    describe('#getAnaerobicExercise()', function () {

        it('should get a list of exercises', function (done) {

            chai.request(server)
                .get('/anaerobicExercises/')
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
                .get('/anaerobicExercises/' + exercisesId[0])
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
                anaerobicExerciseCommon.deleteAnaerobicExerciseById(exercisesId, done);
            });
        });

    });
});
