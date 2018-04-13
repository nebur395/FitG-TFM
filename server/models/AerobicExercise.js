/**
 * Models of the system
 * @namespace Models
 */
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

/**
 * @swagger
 * definitions:
 *   AerobicExercise:
 *     description: Schema del modelo de AerobicExercise que representa un ejercicio aeróbico.
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Identificador único del ejercicio aeróbico que sirve como identificador.
 *       name:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Nombre del ejercicio aeróbico que sirve como identificador.
 *       category:
 *         type: string
 *         required: true
 *         description: Categoría del ejercicio aeróbico (p.ej., running, swimming).
 *       type:
 *         type: string
 *         required: true
 *         description: Tipo del ejercicio aeróbico (p.ej., crawl, butterfly, marathon, sprint).
 *       custom:
 *         type: boolean
 *         required: true
 *         description: Indica si es un ejercicio personalizado o predefinido.
 *       idUser:
 *         type: string
 *         uniqueItems: true
 *         description: Identificador único del usuario. Solo presente si custom == true.
 *       description:
 *         type: string
 *         description: Descripción del ejercicio.
 */

/**
 * @namespace AerobicExercise
 * @desc AerobicExercise Schema
 * @memberOf Models
 */
var AerobicExerciseSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    category: {
        type: String,
        required: true,
        enum: ["running", "swimming"]},
    type: {
        type: String,
        required: true,
        enum: ["crawl", "butterfly", "trail running", "cross running", "sprint"]},
    custom: {type: Boolean, required: true, default: true},
    idUser: {type: mongoose.Schema.Types.ObjectId},
    description: {type: String}
});


// Create the model if it does not exists
module.exports = mongoose.model('AerobicExercise', AerobicExerciseSchema);
