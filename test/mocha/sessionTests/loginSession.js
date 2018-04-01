var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    server = require('../../../server'),
    variables = require("../../../server/config/variables.config"),
    jwt = require('jsonwebtoken'),
    userCommon = require('../../common/userCommon'),
    feedbackMessageCommon = require('../../common/feedbackMessageCommon');

chai.use(chaiHttp);

/**
 * Test suite for Session functionalities.
 */
describe('Session', function () {

    var username = "Testing",
        email = "Testing@email.com",
        password = "Testing",
        idUser;

    var invalidFields = "Please fill out all fields.",
        incorrectCredentials = "Incorrect password or email.",
        invalidToken = "Invalid or non-existent token. Please, send a correct token.";

    /*
     * It creates a new user before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function(id) {
            idUser = id;
            done();
        });

    });

    /**
     * Tests for logIn functionality.
     */
    describe("#logIn()", function () {

        it('should successfully login ', function (done) {

            chai.request(server)
                .post('/login/')
                .send({email: email, password: password})
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('token');
                    var token = result.body.token;
                    jwt.verify(token, variables.fitG_secret, function (err, decoded) {
                        var user = decoded;
                        user.should.be.a('object');
                        user.should.have.property('email');
                        user.email.should.equal(email);
                        user.should.have.property('username');
                        user.username.should.equal(username);
                        user.should.have.property('_id');
                        done();
                    });

                });
        });

        it('should return an error since the user doesn\'t exist', function (done) {

            chai.request(server)
                .post('/login/')
                .send({email: "false@email.com", password: password})
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 404, incorrectCredentials);

                    done();
                });
        });

        it('should return an error since the user\'s password is wrong', function (done) {

            chai.request(server)
                .post('/login/')
                .send({email: email, password: "wrongPass"})
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 404, incorrectCredentials);

                    done();
                });
        });

        it('should return an error since the email is blank', function (done) {

            chai.request(server)
                .post('/login/')
                .send({email: "", password: password})
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, invalidFields);

                    done();
                });
        });

        it('should return an error since the password is blank', function (done) {

            chai.request(server)
                .post('/login/')
                .send({email: email, password: ""})
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, invalidFields);

                    done();
                });
        });

        it('should return an error since token doesn\'t exist ', function (done) {

            chai.request(server)
                .put('/users/' + idUser)
                .send({email: email, username: username, oldPassword: password,
                    password: password, rePassword: password})
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 401, invalidToken);

                    done();

                });
        });
    });


    /*
     * Removes the user created at the begining of the tests
     * after every test is finished.
     */
    after(function (done) {

        userCommon.deleteUserById(idUser, done);

    });
});
