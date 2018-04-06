var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken,
    bodyAnalisisCommon = require('../../common/bodyAnalisisCommon');

chai.use(chaiHttp);

/**
 * Test suite for body analysis functionalities.
 */
describe('BodyAnalysis', function () {

    var username = "Testing",
        email = "Testing@email.com",
        password = "Testing";

    var analisisId = [],
        idUser;

    /*
     * It creates a new entities before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function(id) {
            idUser = id;
            bodyAnalisisCommon.createBodyAnalisis(idUser, function (id) {
                analisisId.push(id);
                done();
            });
        });

    });

    /**
     * Tests for get body analysis functionality.
     */
    describe('#getBodyAnalysis()', function () {

        it('should get a list of body analysis', function (done) {

            chai.request(server)
                .get('/bodyAnalisis/')
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('analisis');
                    result.body.analisis.should.be.a('array');

                    done();
                });
        });

        it('should get a body analysis', function (done) {

            chai.request(server)
                .get('/bodyAnalisis/' + analisisId[0])
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('analisis');
                    result.body.analisis.should.be.a('object');
                    result.body.analisis.should.have.property('_id');
                    result.body.analisis.should.have.property('weight');
                    result.body.analisis.should.have.property('bmi');
                    result.body.analisis.should.have.property('metabolicAge');
                    result.body.analisis.should.have.property('basalMetabolism');
                    result.body.analisis.should.have.property('bodyFat');
                    result.body.analisis.should.have.property('muscleMass');
                    result.body.analisis.should.have.property('boneMass');
                    result.body.analisis.should.have.property('bodyFluids');
                    result.body.analisis.should.have.property('visceralAdiposity');
                    result.body.analisis.should.have.property('dailyCaloricIntake');
                    result.body.analisis.should.have.property('idUser');

                    done();
                });
        });

        /*
         * Removes the entities created during the signIn tests.
         */
        after(function (done) {

            userCommon.deleteUserById(idUser, function () {
                bodyAnalisisCommon.deleteBodyAnalisisById(analisisId, done);
            });
        });

    });
});
