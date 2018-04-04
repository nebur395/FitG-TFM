/**
 * Models of the system
 * @namespace Models
 */
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

/**
 * @swagger
 * definitions:
 *   AnaerobicMark:
 *     description: Schema del modelo de AnaerobicMark que representa una marca de un ejercicio
 *       anaeróbico.
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Identificador único de la marca del ejercicio anaeróbico.
 *       idExercise:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Identificador único del ejercicio anaeróbico.
 *       idUser:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Identificador único del usuario.
 *       repetitions:
 *         type: number
 *         format: double
 *         description: Lista en la que cada elemento corresponde con el número de repeticiones
 *           realizadas en cada serie del ejercicio.
 *       weight:
 *         type: number
 *         format: double
 *         description: Lista en la que cada elemento corresponde con el peso en kg realizado en
 *           cada serie del ejercicio.
 *       time:
 *         type: number
 *         format: double
 *         description: Lista en la que cada elemento corresponde con la duración en segundos
 *           del ejercicio realizada en cada serie.
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
 * @namespace AnaerobicMark
 * @desc AnaerobicMark Schema
 * @memberOf Models
 */
var AnaerobicMarkSchema = mongoose.Schema({
    idExercise: {type: mongoose.Schema.Types.ObjectId, required: true},
    idUser: {type: mongoose.Schema.Types.ObjectId, required: true},
    repetitions: {type: [Number]},
    weight: {type: [Number]},
    time: {type: [Number]},
    comment: {type: String},
    creationDate: {type: Date, default: Date.now}
});

// Create the model if it does not exists
module.exports = mongoose.model('AnaerobicMark', AnaerobicMarkSchema);
