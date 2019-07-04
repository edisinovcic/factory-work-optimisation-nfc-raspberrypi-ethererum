const {responseModel} = require('../model');

class BadRequest extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.type = "BadRequest";
        this.code = 400;
    }
}

class Unauthorized extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.type = "Unauthorized";
        this.code = 401;
    }
}

async function ErrorHandler(err) {
    let response;
    let errMessage = typeof err === 'string' ? err : err.message;
    if (err.type === 'BadRequest') {
        response = responseModel.badRequest("Create failed", null, errMessage);
    } else if (err.type === 'Unauthorized') {
        response = responseModel.unauthorized("Unauthorized", null, errMessage);
    } else {
        response = responseModel.failResponse("Failed response", null, errMessage);
    }

    return response;
}

module.exports = {
    ErrorHandler,
    BadRequest,
    Unauthorized
};