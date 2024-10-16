import { Router } from 'express';

abstract class Controller {
    protected path: string;
    public router: Router;

    constructor(path: string) {
      this.path = path;
      this.router = Router();

      setTimeout(() => {
        this.initRoutes();
      }, 0);
    }

    protected abstract initRoutes(): void;
}

export default Controller;
