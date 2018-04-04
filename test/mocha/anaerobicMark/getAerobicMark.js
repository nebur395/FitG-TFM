var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken,
    anaerobicMarkCommon = require('../../common/anaerobicMarkCommon'),
    anaerobicExerciseCommon = require('../../common/anaerobicExerciseCommon');

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
    describe('#getAnaerobicMark()', function () {

        it('should get a list of marks', function (done) {

            chai.request(server)
                .get('/anaerobicExercises/' + exercisesId[0] + '/anaerobicMarks')
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('marks');
                    result.body.marks.should.be.a('array');

                    done();
                });
        });

        it('should get a mark', function (done) {

            chai.request(server)
                .get('/anaerobicExercises/' + exercisesId[0] + '/anaerobicMarks/' + marksId[0])
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
