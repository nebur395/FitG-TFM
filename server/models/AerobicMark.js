/**
 * Models of the system
 * @namespace Models
 */
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

/**
 * @swagger
 * definitions:
 *   AerobicMark:
 *     description: Schema del modelo de AerobicMark que representa una marca de un ejercicio
 *       aeróbico.
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Identificador único de la marca del ejercicio aeróbico.
 *       idExercise:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Identificador único del ejercicio aeróbico.
 *       idUser:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Identificador único del usuario.
 *       distance:
 *         type: number
 *         format: double
 *         required: true
 *         description: Distancia recorrida durante el ejercicio. Expresado en km.
 *       time:
 *         type: number
 *         format: double
 *         description: Duración en minutos del ejercicio. Expresado en minutos.
 *       intensity:
 *         type: number
 *         format: double
 *         description: Intensidad con la que se ha realizado el ejercicio. Escala Borg 1-10.
 *       heartRate:
 *         type: number
 *         format: double
 *         description: Ritmo cardiaco medio durante el ejercicio. Pulsaciones por minuto.
 *       comment:
 *         type: string
 *         format: double
 *         description: Comentario adicional introducido para la marca del ejercicio.
 *       creationDate:
 *         type: string
 *         format: date
 *         description: Fecha en la que se ha realizado la marca del ejercicio.
 */

/**
 * @namespace AerobicMark
 * @desc AerobicMark Schema
 * @memberOf Models
 */
var AerobicMarkSchema = mongoose.Schema({
    idExercise: {type: mongoose.Schema.Types.ObjectId, required: true},
    idUser: {type: mongoose.Schema.Types.ObjectId, required: true},
    distance: {type: Number, required: true, min: 0, max: 3431},
    time: {type: Number, required: true, min: 0, max: 1440},
    intensity: {type: Number, min: 0, max: 10},
    heartRate: {type: Number, min:0, max: 225},
    comment: {type: String},
    creationDate: {type: Date, default: Date.now}
});

// Create the model if it does not exists
module.exports = mongoose.model('AerobicMark', AerobicMarkSchema);
