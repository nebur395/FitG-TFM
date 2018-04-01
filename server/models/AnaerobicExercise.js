/**
 * Models of the system
 * @namespace Models
 */
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

/**
 * @swagger
 * definitions:
 *   AnaerobicExercise:
 *     description: Schema del modelo de AnaerobicExercise que representa un ejercicio anaeróbico.
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Identificador único del ejercicio anaeróbico que sirve como identificador.
 *       name:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Nombre del ejercicio anaeróbico que sirve como identificador.
 *       category:
 *         type: string
 *         required: true
 *         description: Categoría del ejercicio anaeróbico (p.ej., ).
 *       type:
 *         type: string
 *         required: true
 *         description: Tipo del ejercicio anaeróbico (p.ej., ).
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
 * @namespace AnaerobicExercise
 * @desc AnaerobicExercise Schema
 * @memberOf Models
 */
var AnaerobicExerciseSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    category: {
        type: String,
        required: true,
        enum: ["muscle training"]},
    type: {
        type: String,
        required: true,
        enum: ["chest", "back", "shoulder", "triceps", "biceps", "legs", "gluteus", "abs"]},
    custom: {type: Boolean, required: true, default: true},
    idUser: {type: mongoose.Schema.Types.ObjectId},
    description: {type: String}
});


// Create the model if it does not exists
module.exports = mongoose.model('AnaerobicExercise', AnaerobicExerciseSchema);
