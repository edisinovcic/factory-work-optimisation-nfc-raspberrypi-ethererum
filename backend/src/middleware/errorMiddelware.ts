import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import NotFound from "../exceptions/NotFound";
import BadRequest from "../exceptions/BadRequest";

export function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
  if (error.message.includes("call exception")) {
    castError(new NotFound(error.message), request, response, next);
  } else if (error.message.includes("network does support")) {
    castError(new BadRequest(error.message), request, response, next);
  } else {
    castError(new HttpException(), request, response, next);
  }
}

function castError(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  response
    .status(status)
    .send({
      status,
      message,
    });
}


export default errorMiddleware;