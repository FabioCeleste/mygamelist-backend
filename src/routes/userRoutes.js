import { Router } from 'express';

import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const routes = new Router();

routes.get('/index', userController.index);

routes.post('/new-user', userController.store);
routes.get('/show/:id', userController.show);
routes.put('/update', loginRequired, userController.update);
routes.delete('/delete', loginRequired, userController.delete);

export default routes;
