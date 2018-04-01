var express = require('express');
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;

module.exports = function (app) {

    /**
     * @swagger
     * definitions:
     *   FeedbackMessage:
     *     description: Mensaje de feedback que se devuelve al usuario en caso de error o acierto en una determinada
     *       operación.
     *     type: object
     *     properties:
     *       message:
     *         type: string
     *         required: true
     *         description: Mensaje que describe el resultado de una operación.
     */
    var router = express.Router();
    var User = app.models.User;

    /**
     * @swagger
     * /users/:
     *   post:
     *     tags:
     *       - Users
     *     summary: Crear usuario (Sign Up)
     *     description: Crea un nuevo usuario en el sistema.
     *     consumes:
     *       - application/json
     *       - charset=utf-8
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: username
     *         description: Nombre del usuario.
     *         in: body
     *         required: true
     *         type: string
     *       - name: password
     *         description: Contraseña de la cuenta familiar.
     *         in: body
     *         required: true
     *         type: string
     *       - name: rePassword
     *         description: Contraseña repetida de la cuenta familiar.
     *         in: body
     *         required: true
     *         type: string
     *       - name: email
     *         description: Email del usuario que sirve como identificador.
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       400:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       500:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     */
    router.post("/", function (req, res) {

        // Checks if passwords are of adequate length
        if (isValidPassword(req.body.password)) {
            return res.status(400).send({
                "message": "Invalid password."
            });
        }

        // Checks if both passwords are equals
        if (!passwordsMatch(req.body.password, req.body.rePassword)) {
            return res.status(400).send({
                "message": "Passwords do not match."
            });
        }

        var newUser = new User();

        // Add the new attributes to the user object
        newUser.email = req.body.email;
        newUser.username = req.body.username;
        newUser.setPassword(req.body.password);

        newUser.save(function (err) {
            if (err) {
                return errorMessageHandler(err, res);
            } else {
                return res.status(200).send({
                    "message": "User created successfully."
                });
            }
        });
    });

    // Preload post objects on routes with ':user'
    router.param('user', function(req, res, next, id) {

        User.findOne({_id: id}, function (err, user) {
            if (err) {
                return errorMessageHandler(err, res);
            }
            if (!user) {
                return res.status(404).send({
                    "message": "Incorrect password or email."
                });
            }
            if (req.jwtPayload._id !== id) {
                return res.status(401).send({
                    "message": "Invalid or non-existent token. Please, send a correct token."
                });
            }

            req.user = user;
            return next();
        });
    });

    /**
     * @swagger
     * /users/{email}:
     *   put:
     *     tags:
     *       - Users
     *     summary: Editar perfil de usuario.
     *     description: Posibilidad de cambiar los datos de la cuenta de usuario.
     *     consumes:
     *       - application/json
     *       - charset=utf-8
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: |
     *           JWT estándar: `Authorization: Bearer + JWT`.
     *         in: header
     *         required: true
     *         type: string
     *         format: byte
     *       - name: id
     *         description: ID del usuario que sirve como identificador.
     *         in: path
     *         required: true
     *         type: string
     *       - name: email
     *         description: Email del usuario.
     *         in: body
     *         required: true
     *         type: string
     *       - name: name
     *         description: Nombre del usuario.
     *         in: body
     *         required: true
     *         type: string
     *       - name: oldPassword
     *         description: Contraseña actual del usuario.
     *         in: body
     *         required: true
     *         type: string
     *       - name: password
     *         description: Contraseña nueva del usuario.
     *         in: body
     *         required: false
     *         type: string
     *       - name: rePassword
     *         description: Contraseña nueva del usuario.
     *         in: body
     *         required: false
     *         type: string
     *     responses:
     *       200:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       400:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       401:
     *         description: Mensaje de feedback para el usuario. Normalmente causado por no
     *           tener un token correcto o tenerlo caducado.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       500:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     */
    router.put("/:user", function (req, res) {

        // Checks if passwords are of adequate length
        if (req.body.password && isValidPassword(req.body.password)) {
            return res.status(400).send({
                "message": "Invalid new password."
            });
        }

        // Checks if both passwords are equals
        if (req.body.password && !passwordsMatch(req.body.password, req.body.rePassword)) {
            return res.status(400).send({
                "message": "New passwords do not match."
            });
        }

        // Checks if old password is correct
        if (req.user.checkPassword(req.body.oldPassword)) {
            req.user.email = req.body.email;
            req.user.username = req.body.username;
            if (req.body.password) {
                req.user.setPassword(req.body.password);
            }

            req.user.save(function (err) {
                if (err) {
                    return errorMessageHandler(err, res);
                }  else {
                    return res.status(200).send({
                        "message": "User updated successfully."
                    });
                }
            });
        } else {
            return res.status(404).send({
                "message": "Incorrect password or email."
            });
        }
    });

    /**
     * @name isValidPassword
     * @desc True if [password] meets the minimum security conditions
     * @param {string} password - Password to check
     * @returns {boolean}
     */
    function isValidPassword (password) {
        return (password.length < 5) || (password.length > 20);
    }

    /**
     * @name passwordsMatch
     * @desc True if [password] and [rePassword] are equals
     * @param {string} password - Password to check
     * @param {string} rePassword - Password to check
     * @returns {boolean}
     */
    function passwordsMatch (password, rePassword) {
        return password === rePassword;
    }

    return router;
};
