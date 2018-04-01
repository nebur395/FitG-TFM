var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    feedbackMessageCommon = require('../../common/feedbackMessageCommon');

chai.use(chaiHttp);

/**
 * Test suite for User functionalities.
 */
describe('User', function () {

    var username = "Testing",
        email = "Testing@email.com",
        password = "Testing";

    var invalidPassword = "Invalid password.",
        passwordsNotMatch = "Passwords do not match.",
        emailExist = "Unique key duplicated.",
        successMessage = "User created successfully.";

    /**
     * Tests for signUp functionality.
     */
    describe('#signUp()', function () {

        it('should sign up a new user', function (done) {

            chai.request(server)
                .post('/users/')
                .send({username: username, password: password, rePassword: password, email: email})
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 200, successMessage);

                    done();

                });
        });

        it('should return an error message since the user already exists', function (done) {

            chai.request(server)
                .post('/users/')
                .send({username: username, password: password, rePassword: password, email: email})
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, emailExist);
                    userCommon.deleteUserByEmail(email, done);
                });
        });

        it('should return an error message since name is blank', function (done) {

            chai.request(server)
                .post('/users/')
                .send({username: "", password: password, rePassword: password, email: email})
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "username");

                    done();
                });
        });

        it('should return an error message since password is blank', function (done) {

            chai.request(server)
                .post('/users/')
                .send({username: username, password: "", rePassword: password, email: email})
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "password");

                    done();
                });
        });

        it('should return an error message since rePassword is blank', function (done) {

            chai.request(server)
                .post('/users/')
                .send({username: username, password: password, rePassword: "", email: email})
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, passwordsNotMatch);

                    done();
                });
        });

        it('should return an error message since passwords doesn\'t match', function (done) {

            chai.request(server)
                .post('/users/')
                .send({username: username, password: password, rePassword: "wrongPass", email: email})
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, passwordsNotMatch);

                    done();
                });
        });

        it('should return an error message since password is too short', function (done) {

            chai.request(server)
                .post('/users/')
                .send({username: username, password: "pass", rePassword: "pass", email: email})
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, invalidPassword);

                    done();
                });
        });

        it('should return an error message since password is too long', function (done) {

            chai.request(server)
                .post('/users/')
                .send({username: username, password: "PassPassPassPassPass1",
                    rePassword: "PassPassPassPassPass1", email: email})
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, invalidPassword);

                    done();
                });
        });

        it('should return an error message since email is blank', function (done) {

            chai.request(server)
                .post('/users/')
                .send({username: username, password: password, rePassword: password, email: ""})
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "email");

                    done();
                });
        });

        /*
         * Removes the user created during the signIn tests.
         */
        after(function (done) {

            userCommon.deleteUserByEmail(email, done);

        });

    });
});
