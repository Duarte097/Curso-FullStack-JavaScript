import { Request, Response } from 'express';
import responseNotFound from '../Responses/ResponseNotFound';

function notFoundErrorMiddleware(req: Request, res: Response) {
  return responseNotFound(res);
}

export default notFoundErrorMiddleware;
