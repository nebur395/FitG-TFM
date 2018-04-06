var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken,
    bodyAnalysisCommon = require('../../common/bodyAnalysisCommon');

chai.use(chaiHttp);

/**
 * Test suite for body analysis functionalities.
 */
describe('BodyAnalysis', function () {

    var username = "Testing",
        email = "Testing@email.com",
        password = "Testing";

    var analysisId = [],
        idUser;

    /*
     * It creates a new entities before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function(id) {
            idUser = id;
            bodyAnalysisCommon.createBodyAnalysis(idUser, function (id) {
                analysisId.push(id);
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
                .get('/bodyAnalysis/')
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('analysis');
                    result.body.analysis.should.be.a('array');

                    done();
                });
        });

        it('should get a body analysis', function (done) {

            chai.request(server)
                .get('/bodyAnalysis/' + analysisId[0])
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('analysis');
                    result.body.analysis.should.be.a('object');
                    result.body.analysis.should.have.property('_id');
                    result.body.analysis.should.have.property('weight');
                    result.body.analysis.should.have.property('bmi');
                    result.body.analysis.should.have.property('metabolicAge');
                    result.body.analysis.should.have.property('basalMetabolism');
                    result.body.analysis.should.have.property('bodyFat');
                    result.body.analysis.should.have.property('muscleMass');
                    result.body.analysis.should.have.property('boneMass');
                    result.body.analysis.should.have.property('bodyFluids');
                    result.body.analysis.should.have.property('visceralAdiposity');
                    result.body.analysis.should.have.property('dailyCaloricIntake');
                    result.body.analysis.should.have.property('idUser');

                    done();
                });
        });

        /*
         * Removes the entities created during the signIn tests.
         */
        after(function (done) {

            userCommon.deleteUserById(idUser, function () {
                bodyAnalysisCommon.deleteBodyAnalysisById(analysisId, done);
            });
        });

    });
});
