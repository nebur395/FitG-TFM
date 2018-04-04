var express = require('express');
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;
var anaerobicExerciseParam = require('../common/anaerobicExercise.param').anaerobicExerciseParam;
var anaerobicMarkParam = require('../common/anaerobicMark.param').anaerobicMarkParam;

module.exports = function (app) {

    var router = express.Router();
    var AnaerobicMark = app.models.AnaerobicMark;

    // Preload post objects on routes with ':anaerobicExercise'
    router.param('anaerobicExercise', function(req, res, next, id) {
        anaerobicExerciseParam(req, res, next, id)
    });

    /**
     * @swagger
     * /anaerobicExercises/{anaerobicExercise}/anaerobicMarks:
     *   post:
     *     tags:
     *       - Anaerobic marks
     *     summary: Listar las marcas de un ejercicio anaeróbico.
     *     description: Lista todas las marcas de un ejercicio anaeróbico.
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
     *       - name: anaerobicExercise
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
     *                $ref: '#/definitions/AnaerobicMark'
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
    router.get("/:anaerobicExercise/anaerobicMarks", function (req, res) {
        AnaerobicMark.find({$and: [
                {idUser: req.jwtPayload._id},
                {idExercise: req.anaerobicExercise._id}
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

    router.post("/:anaerobicExercise/anaerobicMarks", function (req, res) {

        var newMark = new AnaerobicMark();

        // Add the new attributes to the mark object
        newMark.repetitions = req.body.repetitions;
        newMark.weight = req.body.weight;
        newMark.time = req.body.time;
        newMark.idUser = req.jwtPayload._id;
        newMark.idExercise = req.anaerobicExercise._id;
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
