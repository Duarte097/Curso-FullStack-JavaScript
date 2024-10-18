import { NextFunction, Request, Response } from 'express';
import HttpException from '../Erros/HttpException';
import HttpStatusCode from '../Responses/HttpStatusCode';
import responseRunTimeError from '../Responses/ResponseRunTimeError';

function runTimeErrorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status = error.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
  const message = error.message || 'Erro não identificado';
  responseRunTimeError(res, status, message);
}

export default runTimeErrorMiddleware;
