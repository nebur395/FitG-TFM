var models = require('../../models/index');
var BodyAnalisis = models.BodyAnalisis;
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;

/**
 * @name errorMessageHandler
 * @desc Manage a http message from  a Mongoose error
 * @param {Object} err - Mongoose error object
 * @param {Object } res - Http response
 */
function bodyAnalisisParam(req, res, next, id){

    BodyAnalisis.findOne({_id: id}, function (err, analisis) {
        if (err) {
            return errorMessageHandler(err, res);
        }
        if (!analisis) {
            return res.status(404).send({
                "message": "Body analisis does not exist."
            });
        }
        if (analisis.idUser && (req.jwtPayload._id !== analisis.idUser.toString())) {
            return res.status(401).send({
                "message": "Invalid or non-existent token. Please, send a correct token."
            });
        }

        req.bodyAnalisis = analisis;
        return next();
    });
}

exports.bodyAnalisisParam = bodyAnalisisParam;
