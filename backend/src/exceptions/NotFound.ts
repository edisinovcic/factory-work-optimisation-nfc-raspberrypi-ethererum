import HttpException from "./HttpException";

class NotFound extends HttpException {
    constructor(message: string) {
      super(404, message);
    }
}

export default NotFound;