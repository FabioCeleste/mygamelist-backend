import { Router } from 'express';

import beatController from '../controllers/BeatController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get(('/:gameId'), loginRequired, beatController.store);
router.delete(('/:gameId'), loginRequired, beatController.delete);

export default router;
