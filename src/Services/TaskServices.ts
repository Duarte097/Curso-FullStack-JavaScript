import { Request } from 'express';
import { FilterQuery } from 'mongoose';
import Task, { StatusEnum, TaskInterface } from '../Schemas/Task';

export enum TaskFilterEnum{
  MY = 'MY',
  OPEND = 'OPEND',
  FINISHED = 'FINISHED',
  ALL = 'ALL',
}

class TaskService {
  public getParamsList(req: Request): FilterQuery<TaskInterface> {
    const { filter, _id } = req.params;
    if (!filter) return {};
    const taskFilter = TaskFilterEnum[filter as keyof typeof TaskFilterEnum];

    if (taskFilter === TaskFilterEnum.MY) return { responsible: { _id } };
    if (taskFilter === TaskFilterEnum.OPEND) return { status: StatusEnum.OPEN };
    if (taskFilter === TaskFilterEnum.FINISHED) return { status: StatusEnum.FINISHED };
    if (taskFilter === TaskFilterEnum.ALL) return {};

    return {};
  }
  public checkStatusFinished(task: TaskInterface) {
    if (StatusEnum.FINISHED === task.status) task.concluded = new Date();
  }
}

export default new TaskService();
