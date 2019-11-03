import 'dotenv/config';
import express from 'express';
import { resolve } from 'path';
import './database';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/public',
      express.static(resolve(__dirname, '..', 'public'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
