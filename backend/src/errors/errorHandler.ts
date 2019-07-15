const {responseModel} = require("../helpers/index");

class BadRequest extends Error {

    message: string;
    type: string;
    code: number;

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadRequest.name;
        /*
        this.message = message;
        this.type = "BadRequest";
        this.code = 400;
        */
    }
}

class Unauthorized extends Error {

    message: string;
    type: string;
    code: number;

    constructor(message: string) {
        super();
        this.message = message;
        this.type = "Unauthorized";
        this.code = 401;
    }
}

class NotFound extends Error {

    message: string;
    type: string;
    code: number;

    constructor(message: string) {
        super();
        this.message = message;
        this.type = "NotFound";
        this.code = 404;
    }
}

export async function ErrorHandler(err: any) {
    let response;
    const errMessage = typeof err === "string" ? err : err.message;
    if (err.type === "BadRequest") {
        response = new responseModel.badRequest("Create failed", null, errMessage);
    } else if (err.type === "Unauthorized") {
        response = responseModel.unauthorized("Unauthorized", null, errMessage);
    } else if (err.type === "NotFound") {
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