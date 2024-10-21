import { NextFunction } from 'express';
import { FilterQuery } from 'mongoose';
import Task, { TaskInterface } from '../Schemas/Task';
import UserContainTaskException from '../Erros/UserContainTaskException';

class UserServices {
  public async validateExistAnyTask(id: string, next: NextFunction): Promise<boolean> {
    const task = await Task.exists({ responsible: { _id: id } } as FilterQuery<TaskInterface>);

    if (task) {
      next(new UserContainTaskException());
      return true;
    }
    return false;
  }
}

export default new UserServices();
