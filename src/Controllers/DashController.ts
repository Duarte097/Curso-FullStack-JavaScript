import { NextFunction, Request, Response } from 'express';
import Controller from './Controllers';
import ServerErrorException from '../Erros/ServerErrorException';
import NoContentException from '../Erros/NoContentException';
import Task from '../Schemas/Task';
import responseOk from '../Responses/ResponseOk';

class DashController extends Controller {
  constructor() {
    super('/dash');
  }
  protected initRoutes(): void {
    this.router.get(this.path, this.list);
  }
  private async list(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const tasks = await Task.find({}, '-_id -__v -description -concluded -creation').populate('responsible', 'name');
      if (tasks.length) return responseOk(res, tasks);
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }
}
export default DashController;
