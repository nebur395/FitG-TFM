var express = require('express');
var passport = require('passport');
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;

module.exports = function () {

    var router = express.Router();

    /**
     * @swagger
     * /login/:
     *   post:
     *     tags:
     *       - Session
     *     summary: Iniciar sesión
     *     description: End-point para iniciar sesión en el sistema. Devuelve un JWT válido para 1h.
     *     consumes:
     *       - application/json
     *       - charset=utf-8
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: email
     *         description: Email del usuario que quiere iniciar sesión.
     *         in: body
     *         required: true
     *         type: string
     *       - name: password
     *         description: Contraseña del usuario que quiere iniciar sesión.
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Información de perfil del usuario metido dentro de un JSON Web Token.
     *         schema:
     *           type: object
     *           properties:
     *             token:
     *               $ref: '#/definitions/User'
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
    router.post("/", function (req, res) {

        if(!req.body.email || !req.body.password){
            return res.status(400).send({
                "message": "Please fill out all fields."
            });
        }

        passport.authenticate('local', function(err, user){
            if(err){
                return errorMessageHandler(err, res);
            }
            if(user){
                return res.status(200).send({
                    "token": user.generateJWT()
                });
            } else {
                return res.status(404).send({
                    "message": "Incorrect password or email."
                });
            }
        })(req, res);

    });

    return router;
};
