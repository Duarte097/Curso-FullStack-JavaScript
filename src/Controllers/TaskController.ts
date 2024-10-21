import { NextFunction, Request, Response } from 'express';
import Controller from './Controllers';
import ValidationService from '../Services/ValidationService';
import ServerErrorException from '../Erros/ServerErrorException';
import NoContentException from '../Erros/NoContentException';
import responseCreate from '../Responses/ResponseCreate';
import responseOk from '../Responses/ResponseOk';
import Task, { TaskInterface } from '../Schemas/Task';
import TaskServices from '../Services/TaskServices';

class TaskController extends Controller {
  constructor() {
    super('/task');
  }
  protected initRoutes(): void {
    this.router.get(`${this.path}/:filter/:_id`, this.list);
    this.router.get(`${this.path}/:id`, this.findById);
    this.router.post(this.path, this.create);
    this.router.put(`${this.path}/:id`, this.edit);
    this.router.delete(`${this.path}/:id`, this.delete);
  }
  private async list(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const tarefas = await Task.find(TaskServices.getParamsList(req)).populate('responsible');

      if (tarefas.length) return responseOk(res, tarefas);
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async findById(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { id } = req.params;
      if (ValidationService.validateId(id, next)) return;

      const task = await Task.findById(id);
      if (task) return responseOk(res, task);
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      let task: TaskInterface = req.body;
      TaskServices.checkStatusFinished(task);
      task = await Task.create(task);
      const foundTask = await Task.findById(task.id).populate('responsible');
      if (!foundTask) {
        throw new Error('Task not found');
      }
      task = foundTask;

      return responseCreate(res, task);
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async edit(req: Request, res: Response, next: NextFunction): Promise<Response| undefined> {
    try {
      const { id } = req.params;
      if (ValidationService.validateId(id, next)) return;
      const task: TaskInterface = req.body;
      TaskServices.checkStatusFinished(task);

      const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
      if (updatedTask) return responseOk(res, updatedTask);
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction): Promise<Response| undefined> {
    try {
      const { id } = req.params;

      if (ValidationService.validateId(id, next)) return;

      const task = await Task.findById(id);
      if (task) {
        task.deleteOne();
        return responseOk(res, task);
      }
      next(new NoContentException());
    } catch (error) {
      next(new ServerErrorException(error));
    }
  }
}
export default TaskController;
