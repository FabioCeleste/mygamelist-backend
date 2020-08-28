import { Router } from 'express';

import populateController from '../controllers/PopulateController';

const routes = new Router();

routes.post('/populate', populateController.store);

export default routes;
