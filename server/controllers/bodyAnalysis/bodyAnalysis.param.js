var models = require('../../models/index');
var BodyAnalysis = models.BodyAnalysis;
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;

/**
 * @name errorMessageHandler
 * @desc Manage a http message from  a Mongoose error
 * @param {Object} err - Mongoose error object
 * @param {Object } res - Http response
 */
function bodyAnalysisParam(req, res, next, id){

    BodyAnalysis.findOne({_id: id}, function (err, analysis) {
        if (err) {
            return errorMessageHandler(err, res);
        }
        if (!analysis) {
            return res.status(404).send({
                "message": "Body analysis does not exist."
            });
        }
        if (analysis.idUser && (req.jwtPayload._id !== analysis.idUser.toString())) {
            return res.status(401).send({
                "message": "Invalid or non-existent token. Please, send a correct token."
            });
        }

        req.bodyAnalysis = analysis;
        return next();
    });
}

exports.bodyAnalysisParam = bodyAnalysisParam;
