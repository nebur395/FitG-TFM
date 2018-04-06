var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken,
    aerobicMarkCommon = require('../../common/aerobicMarkCommon'),
    aerobicExerciseCommon = require('../../common/aerobicExerciseCommon');

chai.use(chaiHttp);

/**
 * Test suite for aerobic mark functionalities.
 */
describe('AerobicMark', function () {

    var username = "Testing",
        email = "Testing@email.com",
        password = "Testing";

    var exercisesId = [],
        marksId = [],
        idUser;

    /*
     * It creates some entities before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function(id) {
            idUser = id;
            aerobicExerciseCommon.createCustomAerobicExercise(idUser, function (id) {
                exercisesId.push(id);
                aerobicMarkCommon.createAerobicMark(exercisesId[0], idUser, function(id){
                    marksId.push(id);
                    done();
                });
            });
        });

    });

    /**
     * Tests for aerobicMark functionality.
     */
    describe('#getAerobicMark()', function () {

        it('should get a list of marks', function (done) {

            chai.request(server)
                .get('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks')
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
                .get('/aerobicExercises/' + exercisesId[0] + '/aerobicMarks/' + marksId[0])
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

                    done();
                });
        });

        /*
         * Removes the entities created during the signIn tests.
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
