import express from 'express';
import cors from 'cors';
import mongoose, { Mongoose } from 'mongoose';
import Controller from './Controllers/Controllers';

class App {
public app: express.Application;

public constructor(controllers: Controller[]) {
  this.app = express();
  this.app.use(cors());

  this.initMongoose();
  this.connectDatabase();

  this.initExpressJson();
  this.initControllers(controllers);
}

private initMongoose(): void {
  mongoose.set('runValidators', true);
}

private connectDatabase(): void {
  mongoose.connect('mongodb+srv://Curso-fullstack:<6yiwkzcbG8jUkIYo>@curso.8h63m.mongodb.net/Curso-java?retryWrites=true&w=majority&appName=Curso', {
  });
}

private initExpressJson(): void {
  this.app.use(express.json());
}

private initControllers(controllers: Controller[]): void {
  controllers.forEach((controller) => {
    this.app.use('/', controller.router);
  });
}
public listen(port: number): void {
  this.app.listen(port, () => {
    console.log(`Aplicação iniciada na porta: ${port}`);
  });
}
}

export default App;
