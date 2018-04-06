/**
 * Models of the system
 * @namespace Models
 */
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

/**
 * @swagger
 * definitions:
 *   BodyAnalisis:
 *     description: Schema del modelo de BodyAnalisis que representa un análisis físico.
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Identificador único del análisis físico.
 *       idUser:
 *         type: string
 *         uniqueItems: true
 *         required: true
 *         description: Identificador único del usuario.
 *       bmi:
 *         type: number
 *         format: double
 *         description: Indice de masa corporal (I.M.C.). Se calcula como masa/(estatura²).
 *       weight:
 *         type: number
 *         format: double
 *         description: Peso en expresado en kg.
 *       metabolicAge:
 *         type: number
 *         format: double
 *         description: Edad metabólica.
 *       basalMetabolism:
 *         type: number
 *         format: double
 *         description: Metabolismo basal.
 *       bodyFat:
 *         type: string
 *         format: double
 *         description: Grasa corporal expresado en %.
 *       muscleMass:
 *         type: string
 *         format: double
 *         description: Masa muscular expresada en kg.
 *       boneMass:
 *         type: string
 *         format: double
 *         description: Masa ósea expresada en kg.
 *       bodyFluids:
 *         type: string
 *         format: double
 *         description: Líquidos corporales expresados en %.
 *       visceralAdiposity:
 *         type: string
 *         format: double
 *         description: Adiposidad visceral recogida en la escala de 1-59.
 *       dailyCaloricIntake:
 *         type: string
 *         format: double
 *         description: Aporte calórico diario.
 *       creationDate:
 *         type: string
 *         format: date
 *         description: Fecha en la que se ha realizado la marca del ejercicio.
 */

/**
 * @namespace BodyAnalisis
 * @desc BodyAnalisis Schema
 * @memberOf Models
 */
var BodyAnalisisSchema = mongoose.Schema({
    idUser: {type: mongoose.Schema.Types.ObjectId, required: true},
    weight: {type: Number, required: true, min: 0, max: 400},
    bmi: {type: Number, required: true, min: 0, max: 200},
    metabolicAge: {type: Number, min: 0, max: 150},
    basalMetabolism: {type: Number, min:0, max: 10000},
    bodyFat: {type: Number, min:0, max: 100},
    muscleMass: {type: Number, min:0, max: 150},
    boneMass: {type: Number, min:0, max: 50},
    bodyFluids: {type: Number, min:0, max: 100},
    visceralAdiposity: {type: Number, min:0, max: 59},
    dailyCaloricIntake: {type: Number, min:0, max: 50000},
    creationDate: {type: Date, default: Date.now}
});

// Create the model if it does not exists
module.exports = mongoose.model('BodyAnalisis', BodyAnalisisSchema);
