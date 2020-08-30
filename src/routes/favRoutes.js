import { Router } from 'express';

import favController from '../controllers/FavController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get(('/:gameId'), loginRequired, favController.store);
router.delete(('/:gameId'), loginRequired, favController.delete);

export default router;
