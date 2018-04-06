var express = require('express');
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;
var anaerobicExerciseParam = require('../exercises/anaerobicExercise.param').anaerobicExerciseParam;
var anaerobicMarkParam = require('./anaerobicMark.param').anaerobicMarkParam;

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

    /**
     * @swagger
     * /anaerobicExercises/{anaerobicExercise}/anaerobicMarks:
     *   post:
     *     tags:
     *       - Anaerobic exercises
     *     summary: Crear una marca para un ejercicio anaeróbico
     *     description: Crea una nueva marca para un ejercicio anaeróbico.
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
     *         description: ID del ejercicio al que se quiere añadir la marca.
     *         in: path
     *         required: true
     *         type: string
     *       - name: repetitions
     *         description: Lista en la que cada elemento corresponde con el número de repeticiones
     *           realizadas en cada serie del ejercicio.
     *         in: body
     *         type: number
     *       - name: weight
     *         description: Lista en la que cada elemento corresponde con el peso en kg realizado en
     *           cada serie del ejercicio.
     *         in: body
     *         type: number
     *       - name: time
     *         description: Lista en la que cada elemento corresponde con la duración en segundos
     *           del ejercicio realizada en cada serie.
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
     *         description: Un ejercicio anaeróbico con toda su información.
     *         schema:
     *           type: object
     *           properties:
     *              mark:
     *                $ref: '#/definitions/AnaerobicExercise'
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

    // Preload post objects on routes with ':anaerobicMark'
    router.param('anaerobicMark', function(req, res, next, id) {
        anaerobicMarkParam(req, res, next, id)
    });

    /**
     * @swagger
     * /anaerobicExercises/{anaerobicExercise}/anaerobicMarks/{anaerobicMark}:
     *   post:
     *     tags:
     *       - Anaerobic exercises
     *     summary: Listar ejercicio anaeróbico.
     *     description: Lista toda la información de un ejercicio anaeróbico.
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
     *         description: Identificador del ejercicio al que pertenece la marca.
     *         in: path
     *         required: true
     *         type: string
     *       - name: anaerobicMark
     *         description: Identificador de la marca que se quiere listar.
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Un ejercicio anaeróbico con toda su información.
     *         schema:
     *           type: object
     *           properties:
     *              mark:
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
    router.get("/:anaerobicExercise/anaerobicMarks/:anaerobicMark", function (req, res) {
        var mark = req.anaerobicMark.toJSON();
        delete mark.__v;
        return res.status(200).send({
            "mark": mark
        });
    });

    /**
     * @swagger
     * /anaerobicExercises/{anaerobicExercise}/anaerobicMarks/{anaerobicMark}:
     *   put:
     *     tags:
     *       - Anaerobic exercises
     *     summary: Edita una marca de ejercicio anaeróbico
     *     description: Edita una marca de ejercicio anaeróbico existente.
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
     *         description: ID del ejercicio al que se quiere añadir la marca.
     *         in: path
     *         required: true
     *         type: string
     *       - name: anaerobicMark
     *         description: Identificador de la marca que se quiere listar.
     *         in: path
     *         required: true
     *         type: string
     *       - name: repetitions
     *         description: Lista en la que cada elemento corresponde con el número de repeticiones
     *           realizadas en cada serie del ejercicio.
     *         in: body
     *         type: number
     *       - name: weight
     *         description: Lista en la que cada elemento corresponde con el peso en kg realizado en
     *           cada serie del ejercicio.
     *         in: body
     *         type: number
     *       - name: time
     *         description: Lista en la que cada elemento corresponde con la duración en segundos
     *           del ejercicio realizada en cada serie.
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
    router.put("/:anaerobicExercise/anaerobicMarks/:anaerobicMark", function (req, res) {
        // Add the new attributes to the mark object
        req.anaerobicMark.repetitions = req.body.repetitions;
        req.anaerobicMark.weight = req.body.weight;
        req.anaerobicMark.time = req.body.time;
        req.anaerobicMark.comment = req.body.comment;

        req.anaerobicMark.save(function (err) {
            if (err) {
                return errorMessageHandler(err, res);
            } else {
                return res.status(200).send({
                    "message": "Anaerobic mark updated successfully."
                });
            }
        });
    });

    /**
     * @swagger
     * /anaerobicExercises/{anaerobicExercise}/anaerobicMarks/{anaerobicMark}:
     *   delete:
     *     tags:
     *       - Anaerobic exercises
     *     summary: Elimina una marca ejercicio anaeróbico
     *     description: Elimina una marca ejercicio anaeróbico existente.
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
     *         description: Identificador del ejercicio que se quiere eliminar.
     *         in: path
     *         required: true
     *         type: string
     *       - name: anaerobicMark
     *         description: Identificador de la marca que se quiere eliminar.
     *         in: path
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
    router.delete("/:anaerobicExercise/anaerobicMarks/:anaerobicMark", function (req, res) {
        // Remove the anaerobic mark
        AnaerobicMark.remove({_id: req.anaerobicMark._id}, function (err) {
            if (err) {
                return errorMessageHandler(err, res);
            } else {
                return res.status(200).send({
                    "message": "Anaerobic mark deleted successfully."
                });
            }
        });
    });

    return router;
};
