import App from './app';
import TaskController from './Controllers/TaskController';
import UserController from './Controllers/UserController';

const app = new App([
  new UserController(),
  new TaskController(),
]);

app.listen(3333);
