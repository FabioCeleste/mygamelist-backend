import { Router } from 'express';

import dropController from '../controllers/DropController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get(('/:gameId'), loginRequired, dropController.store);
router.delete(('/:gameId'), loginRequired, dropController.delete);

export default router;
