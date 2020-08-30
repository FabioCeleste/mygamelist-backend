import dotenv from 'dotenv';
dotenv.config();
import './src/database';

import express, { urlencoded } from 'express';

import userRoutes from './src/routes/userRoutes';
import populateRoutes from './src/routes/populateRoutes';
import gameRoutes from './src/routes/gameRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import followRoutes from './src/routes/followRoutes';
import beatRoutes from './src/routes/beatRoutes';
import dropRoutes from './src/routes/dropRoutes';
import wantRoutes from './src/routes/wantRoutes';
import favRoutes from './src/routes/favRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', userRoutes);
    this.app.use('/', populateRoutes);
    this.app.use('/games', gameRoutes);
    this.app.use('/token', tokenRoutes);
    this.app.use('/follow', followRoutes);
    this.app.use('/beat', beatRoutes);
    this.app.use('/drop', dropRoutes);
    this.app.use('/want', wantRoutes);
    this.app.use('/fav', favRoutes);
  }
}

export default new App().app;
