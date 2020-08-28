import { Router } from 'express';

import gameController from '../controllers/GameController';

const routes = new Router();

routes.get('/index/:letter', gameController.index);
routes.get('/show/:gameId', gameController.show);

export default routes;
