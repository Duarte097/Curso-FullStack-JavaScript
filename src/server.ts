import App from './app';
import DashController from './Controllers/DashController';
import TaskController from './Controllers/TaskController';
import UserController from './Controllers/UserController';

const app = new App([
  new UserController(),
  new TaskController(),
  new DashController(),
]);

app.listen(3333);
