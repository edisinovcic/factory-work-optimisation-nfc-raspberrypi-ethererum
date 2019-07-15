import HttpException from "./HttpException";

class BadRequest extends HttpException {
    constructor(message: string){
      super(401, message);
    }
}

export default BadRequest;