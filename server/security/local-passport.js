var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback localPassportCallback
 * @param {Object} err - Mongoose error
 * @param {Object} user - User Model
 */

/**
 * @name localPassport
 * @desc Local Passport strategy to authenticate a user.
 * @param {String} username Email of the user. It has to be in the req.body.email
 * @param {String} password Password of the user. It has to be in the req.body.password
 * @param {localPassportCallback} done - The callback that handles the response.
 * @returns {localPassportCallback}
 * @memberOf Authentication.Strategies
 */
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function (username, password, done) {
        User.findOne({email: username}, function (err, user) {
            if (err) {
                return done(err, null);
            }
            // Return if user not found in database or password is wrong
            if (!user || !user.checkPassword(password)) {
                return done(null, null);
            }
            // If credentials are correct, return the user object
            return done(null, user);
        });
    }
));
