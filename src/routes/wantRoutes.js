import { Router } from 'express';

import wantController from '../controllers/WantController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get(('/:gameId'), loginRequired, wantController.store);
router.delete(('/:gameId'), loginRequired, wantController.delete);

export default router;
