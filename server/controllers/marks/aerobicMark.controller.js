var express = require('express');
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;
var aerobicExerciseParam = require('../common/aerobicExercise.param').aerobicExerciseParam;

module.exports = function (app) {

    var router = express.Router();
    var AerobicExercise = app.models.AerobicExercise;
    var AerobicMark = app.models.AerobicMark;

    // Preload post objects on routes with ':aerobicExercise'
    router.param('aerobicExercise', function(req, res, next, id) {
        aerobicExerciseParam(req, res, next, id)
    });

    /**
     * @swagger
     * /aerobicExercises/{aerobicExercise}/aerobicMarks:
     *   post:
     *     tags:
     *       - Aerobic marks
     *     summary: Listar las marcas de un ejercicio aeróbico.
     *     description: Lista todas las marcas de un ejercicio aeróbico.
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
     *       - name: aerobicExercise
     *         description: Identificador del ejercicio que tiene las marcas.
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Lista con todas las marcas.
     *         schema:
     *           type: object
     *           properties:
     *              marks:
     *               type: array
     *               items:
     *                $ref: '#/definitions/AerobicMark'
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
    router.get("/:aerobicExercise/aerobicMarks", function (req, res) {
        AerobicMark.find({$and: [
                {idUser: req.jwtPayload._id},
                {idExercise: req.aerobicExercise._id}
            ]},
            '-__v', function (err, marks) {
                if (err) {
                    return errorMessageHandler(err, res);

                } else {
                    return res.status(200).send({
                        "marks": marks
                    });
                }
            });
    });

    /**
     * @swagger
     * /aerobicExercises/{aerobicExercise}/aerobicMarks:
     *   post:
     *     tags:
     *       - Aerobic exercises
     *     summary: Crear una marca para un ejercicio aeróbico
     *     description: Crea una nueva marca para un ejercicio aeróbico.
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
     *       - name: aerobicExercise
     *         description: ID del ejercicio al que se quiere añadir la marca.
     *         in: path
     *         required: true
     *         type: string
     *       - name: distance
     *         description: Descripción del ejercicio.
     *         in: body
     *         required: true
     *         type: number
     *       - name: time
     *         description: Descripción del ejercicio.
     *         in: body
     *         required: true
     *         type: number
     *       - name: intensity
     *         description: Descripción del ejercicio.
     *         in: body
     *         required: true
     *         type: number
     *       - name: heartRate
     *         description: Descripción del ejercicio.
     *         in: body
     *         required: true
     *         type: number
     *       - name: comment
     *         description: Descripción del ejercicio.
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Un ejercicio aeróbico con toda su información.
     *         schema:
     *           type: object
     *           properties:
     *              exercise:
     *                $ref: '#/definitions/AerobicExercise'
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
    router.post("/:aerobicExercise/aerobicMarks", function (req, res) {

        var newMark = new AerobicMark();

        // Add the new attributes to the exercise object
        newMark.distance = req.body.distance;
        newMark.time = req.body.time;
        newMark.intensity = req.body.intensity;
        newMark.heartRate = req.body.heartRate;
        newMark.idUser = req.jwtPayload._id;
        newMark.idExercise = req.aerobicExercise._id;
        newMark.comment = req.body.comment;

        newMark.save(function (err, mark) {
            if (err) {
                return errorMessageHandler(err, res);
            } else {
                mark = mark.toJSON();
                delete mark.__v;
                return res.status(200).send({
                    "mark": mark
                });
            }
        });
    });

    return router;
};
