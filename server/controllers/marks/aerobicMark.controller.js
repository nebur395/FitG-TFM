var express = require('express');
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;
var aerobicExerciseParam = require('../common/aerobicExercise.param').aerobicExerciseParam;
var aerobicMarkParam = require('../common/aerobicMark.param').aerobicMarkParam;

module.exports = function (app) {

    var router = express.Router();
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
     *         description: Distancia recorrida durante del ejercicio en km [0,3431].
     *         in: body
     *         required: true
     *         type: number
     *       - name: time
     *         description: Duración del ejercicio en minutos [0,1440].
     *         in: body
     *         required: true
     *         type: number
     *       - name: intensity
     *         description: Intensidad con la que se ha realizado el ejercicio. Escala Borg 1-10.
     *         in: body
     *         required: true
     *         type: number
     *       - name: heartRate
     *         description: Ritmo cardiaco medio durante el ejercicio. Pulsaciones/minuto [0,225].
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
     *              mark:
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

        // Add the new attributes to the mark object
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

    // Preload post objects on routes with ':aerobicMark'
    router.param('aerobicMark', function(req, res, next, id) {
        aerobicMarkParam(req, res, next, id)
    });

    /**
     * @swagger
     * /aerobicExercises/{aerobicExercise}/aerobicMarks/{aerobicMark}:
     *   post:
     *     tags:
     *       - Aerobic exercises
     *     summary: Listar ejercicio aeróbico.
     *     description: Lista toda la información de un ejercicio aeróbico.
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
     *         description: Identificador del ejercicio al que pertenece la marca.
     *         in: path
     *         required: true
     *         type: string
     *       - name: aerobicMark
     *         description: Identificador de la marca que se quiere listar.
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Un ejercicio aeróbico con toda su información.
     *         schema:
     *           type: object
     *           properties:
     *              mark:
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
    router.get("/:aerobicExercise/aerobicMarks/:aerobicMark", function (req, res) {
        var mark = req.aerobicMark.toJSON();
        delete mark.__v;
        return res.status(200).send({
            "mark": mark
        });
    });

    /**
     * @swagger
     * /aerobicExercises/{aerobicExercise}/aerobicMarks/{aerobicMark}:
     *   put:
     *     tags:
     *       - Aerobic exercises
     *     summary: Edita una marca de ejercicio aeróbico
     *     description: Edita una marca de ejercicio aeróbico existente.
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
     *       - name: aerobicMark
     *         description: Identificador de la marca que se quiere listar.
     *         in: path
     *         required: true
     *         type: string
     *       - name: distance
     *         description: Distancia recorrida durante del ejercicio en km [0,3431].
     *         in: body
     *         required: true
     *         type: number
     *       - name: time
     *         description: Duración del ejercicio en minutos [0,1440].
     *         in: body
     *         required: true
     *         type: number
     *       - name: intensity
     *         description: Intensidad con la que se ha realizado el ejercicio. Escala Borg 1-10.
     *         in: body
     *         required: true
     *         type: number
     *       - name: heartRate
     *         description: Ritmo cardiaco medio durante el ejercicio. Pulsaciones/minuto [0,225].
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
    router.put("/:aerobicExercise/aerobicMarks/:aerobicMark", function (req, res) {
        // Add the new attributes to the mark object
        req.aerobicMark.distance = req.body.distance;
        req.aerobicMark.time = req.body.time;
        req.aerobicMark.intensity = req.body.intensity;
        req.aerobicMark.heartRate = req.body.heartRate;
        req.aerobicMark.comment = req.body.comment;

        req.aerobicMark.save(function (err) {
            if (err) {
                return errorMessageHandler(err, res);
            } else {
                return res.status(200).send({
                    "message": "Aerobic mark updated successfully."
                });
            }
        });
    });

    /**
     * @swagger
     * /aerobicExercises/{aerobicExercise}/aerobicMarks/{aerobicMark}:
     *   delete:
     *     tags:
     *       - Aerobic exercises
     *     summary: Elimina una marca ejercicio aeróbico
     *     description: Elimina una marca ejercicio aeróbico existente.
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
     *         description: Identificador del ejercicio que se quiere eliminar.
     *         in: path
     *         required: true
     *         type: string
     *       - name: aerobicMark
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
    router.delete("/:aerobicExercise/aerobicMarks/:aerobicMark", function (req, res) {
        // Remove the aerobic mark
        AerobicMark.remove({_id: req.aerobicMark._id}, function (err) {
            if (err) {
                return errorMessageHandler(err, res);
            } else {
                return res.status(200).send({
                    "message": "Aerobic mark deleted successfully."
                });
            }
        });
    });

    return router;
};
