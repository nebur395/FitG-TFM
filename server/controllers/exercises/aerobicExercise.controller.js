var express = require('express');
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;
var aerobicExerciseParam = require('../common/aerobicExercise.param').aerobicExerciseParam;

module.exports = function (app) {

    var router = express.Router();
    var AerobicExercise = app.models.AerobicExercise;
    var AerobicMark = app.models.AerobicMark;

    /**
     * @swagger
     * /aerobicExercises/:
     *   get:
     *     tags:
     *       - Aerobic exercises
     *     summary: Listar ejercicios aeróbicos.
     *     description: Lista todos los ejercicios aeróbicos predefinidos del sistema mas los
     *       personalizados del usuario.
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
     *         description: Lista con todos los ejercicios.
     *         schema:
     *           type: object
     *           properties:
     *              exercises:
     *               type: array
     *               items:
     *                $ref: '#/definitions/AerobicExercise'
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
        AerobicExercise.find({$or: [
                {idUser: req.jwtPayload._id},
                {custom: false}
            ]},
            '-__v', function (err, exercises) {
                if (err) {
                    return errorMessageHandler(err, res);

                } else {
                    return res.status(200).send({
                        "exercises": exercises
                    });
                }
            });
    });

    /**
     * @swagger
     * /aerobicExercises/:
     *   post:
     *     tags:
     *       - Aerobic exercises
     *     summary: Crear un ejercicio aeróbico
     *     description: Crea un nuevo ejercicio aeróbico.
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
     *       - name: name
     *         description: Nombre del ejercicio.
     *         in: body
     *         required: true
     *         type: string
     *       - name: category
     *         description: Categoría del ejercicio aeróbico (p.ej., running, swimming).
     *         in: body
     *         required: true
     *         type: string
     *       - name: type
     *         description: Tipo del ejercicio aeróbico (p.ej., crawl, butterfly, marathon, sprint).
     *         in: body
     *         required: true
     *         type: string
     *       - name: description
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
    router.post("/", function (req, res) {

        var newExercise = new AerobicExercise();

        // Add the new attributes to the exercise object
        newExercise.name = req.body.name;
        newExercise.category = req.body.category;
        newExercise.type = req.body.type;
        newExercise.idUser = req.jwtPayload._id;
        newExercise.description = req.body.description;

        newExercise.save(function (err, exercise) {
            if (err) {
                return errorMessageHandler(err, res);
            } else {
                exercise = exercise.toJSON();
                delete exercise.__v;
                return res.status(200).send({
                    "exercise": exercise
                });
            }
        });
    });

    // Preload post objects on routes with ':aerobicExercise'
    router.param('aerobicExercise', function(req, res, next, id) {
        aerobicExerciseParam(req, res, next, id)
    });

    /**
     * @swagger
     * /aerobicExercises/{aerobicExercise}:
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
     *         description: Identificador del ejercicio que se quiere listar.
     *         in: path
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
    router.get("/:aerobicExercise", function (req, res) {
        var exercise = req.aerobicExercise.toJSON();
        delete exercise.__v;
        return res.status(200).send({
            "exercise": exercise
        });
    });

    /**
     * @swagger
     * /aerobicExercises/{aerobicExercise}:
     *   put:
     *     tags:
     *       - Aerobic exercises
     *     summary: Edita un ejercicio aeróbico
     *     description: Edita un ejercicio aeróbico existente únicamente si es personalizado.
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
     *         description: Identificador del ejercicio que se quiere editar.
     *         in: path
     *         required: true
     *         type: string
     *       - name: name
     *         description: Nombre del ejercicio.
     *         in: body
     *         required: true
     *         type: string
     *       - name: category
     *         description: Categoría del ejercicio aeróbico (p.ej., running, swimming).
     *         in: body
     *         required: true
     *         type: string
     *       - name: type
     *         description: Tipo del ejercicio aeróbico (p.ej., crawl, butterfly, marathon, sprint).
     *         in: body
     *         required: true
     *         type: string
     *       - name: description
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
    router.put("/:aerobicExercise", function (req, res) {

        // Check if the exercise is custom
        if (req.aerobicExercise.custom) {
            // Add the new attributes to the exercise object
            req.aerobicExercise.name = req.body.name;
            req.aerobicExercise.category = req.body.category;
            req.aerobicExercise.type = req.body.type;
            req.aerobicExercise.description = req.body.description;

            req.aerobicExercise.save(function (err) {
                if (err) {
                    return errorMessageHandler(err, res);
                } else {
                    return res.status(200).send({
                        "message": "Aerobic exercise updated successfully."
                    });
                }
            });
        } else {
            return res.status(400).send({
                "message": "Predefined exercises can not be modified."
            });
        }
    });

    /**
     * @swagger
     * /aerobicExercises/{aerobicExercise}:
     *   delete:
     *     tags:
     *       - Aerobic exercises
     *     summary: Elimina un ejercicio aeróbico
     *     description: Elimina un ejercicio aeróbico existente únicamente si es personalizado.
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
     *         description: Identificador del ejercicio que se quiere editar.
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
    router.delete("/:aerobicExercise", function (req, res) {

        // Check if the exercise is custom
        if (req.aerobicExercise.custom) {
            // Remove the aerobic exercise
            AerobicExercise.remove({_id: req.aerobicExercise._id}, function (err) {
                if (err) {
                    return errorMessageHandler(err, res);
                } else {
                    // Remove the anaerobic marks of the exercise
                    AerobicMark.find({idExercise: req.aerobicExercise._id}).remove(function (err) {
                        if (err) {
                            return errorMessageHandler(err, res);
                        } else {
                            return res.status(200).send({
                                "message": "Aerobic exercise deleted successfully."
                            });
                        }
                    });
                }
            });
        } else {
            return res.status(400).send({
                "message": "Predefined exercises can not be deleted."
            });
        }
    });

    return router;
};
