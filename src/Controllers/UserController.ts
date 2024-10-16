import { NextFunction, Request, Response } from 'express';
import Controller from './Controllers';
import User from '../Schemas/user';

class UserController extends Controller {
  constructor() {
    super('user');
  }
  protected initRoutes(): void {
    this.router.get('/', this.list);
  }
  private async list(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const users = await User.find();
    return res.send(users);
  }
}
export default UserController;
