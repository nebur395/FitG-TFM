/**
 * Models of the system
 * @namespace Models
 */
var mongoose = require("mongoose"),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    variables = require("../config/variables.config");

mongoose.Promise = global.Promise;

/**
 * @swagger
 * definitions:
 *   User:
 *     description: Schema del modelo de User que representa una cuenta de usuario.
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Identificador único del usuario en el sistema.
 *       email:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Email de la cuenta de usuario que sirve como identificador.
 *       username:
 *         type: string
 *         required: true
 *         description: Nombre de la cuenta del usuario.
 */

/**
 * @namespace User
 * @desc User Schema
 * @memberOf Models
 */
var UserSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    registerDate: {type: Date, default: Date.now}
});

/**
 * @name checkPassword
 * @desc Returns true if [password] matches the stored user.
 * @param {string} password - Password to check
 * @returns {boolean}
 * @memberOf Models.User
 */
UserSchema.methods.checkPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

    return this.password === hash;
};

/**
 * @name setPassword
 * @desc Set the new password by storing it with a cryptographic algorithm.
 * @param {string} password - Password to check
 * @memberOf Models.User
 */
UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');

    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

/**
 * @name generateJWT
 * @desc Generate a Json Web Object with users info that expires in 1h.
 * @returns {Object} jwt
 * @returns {string} jwt._id
 * @returns {string} jwt.email
 * @returns {string} jwt.username
 * @memberOf Models.User
 */
UserSchema.methods.generateJWT = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        variables.fitG_secret,
        {
            expiresIn: "1h"     // expires in 1 hour
        });
};

// Create the model if it does not exists
module.exports = mongoose.model('User', UserSchema);
