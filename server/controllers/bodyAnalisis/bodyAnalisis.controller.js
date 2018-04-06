var express = require('express');
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;
var bodyAnalisisParam = require('../common/aerobicExercise.param').bodyAnalisisParam;

module.exports = function (app) {

    var router = express.Router();
    var BodyAnalisis = app.models.BodyAnalisis;

    /**
     * @swagger
     * /bodyAnalisis/:
     *   get:
     *     tags:
     *       - Body Analisis
     *     summary: Listar análisis físicos.
     *     description: Lista todos los análisis físicos.
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
     *     responses:
     *       200:
     *         description: Lista con todos los análisis físicos.
     *         schema:
     *           type: object
     *           properties:
     *              analisis:
     *               type: array
     *               items:
     *                $ref: '#/definitions/BodyAnalisis'
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
    router.get("/", function (req, res) {
        BodyAnalisis.find({idUser: req.jwtPayload._id}, '-__v', function (err, analisis) {
                if (err) {
                    return errorMessageHandler(err, res);

                } else {
                    return res.status(200).send({
                        "analisis": analisis
                    });
                }
            });
    });

    return router;
};
