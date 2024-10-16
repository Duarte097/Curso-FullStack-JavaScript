import App from './app';
import UserController from './Controllers/UserController';

const app = new App([new UserController()]);

app.listen(3333);
