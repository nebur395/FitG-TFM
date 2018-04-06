var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    ObjectId = require('mongoose').Types.ObjectId,
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken,
    anaerobicExerciseCommon = require('../../common/anaerobicExerciseCommon'),
    anaerobicMarkCommon = require('../../common/anaerobicMarkCommon');

chai.use(chaiHttp);

/**
 * Test suite for Anaerobic Mark functionalities.
 */
describe('AnaerobicMark', function () {

    var username = "Testing",
        email = "Testing@email.com",
        password = "Testing";

    var repetitions = [1,1],
        weight = [1,1],
        time = [1,1];

    var exercisesId = [],
        marksId = [],
        idUser;

    /*
     * It creates some entities before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function(id) {
            idUser = id;
            anaerobicExerciseCommon.createCustomAnaerobicExercise(idUser, function(id){
                exercisesId.push(id);
                done();
            });
        });

    });

    /**
     * Tests for ananaerobicMark functionality.
     */
    describe('#createAnaerobicMark()', function () {

        it('should create a new anaerobic mark', function (done) {

            chai.request(server)
                .post('/anaerobicExercises/' + exercisesId[0] + '/anaerobicMarks')
                .send({repetitions: repetitions, weight: weight, time: time})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('mark');
                    result.body.mark.should.be.a('object');
                    result.body.mark.should.have.property('_id');
                    result.body.mark.should.have.property('repetitions');
                    result.body.mark.should.have.property('weight');
                    result.body.mark.should.have.property('time');
                    result.body.mark.should.have.property('idUser');
                    result.body.mark.should.have.property('idExercise');

                    marksId.push(new ObjectId(result.body.mark._id));

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
