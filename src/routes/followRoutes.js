import { Router } from 'express';

import followController from '../controllers/FollowController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/:targetId', loginRequired, followController.store);
router.get('/unfollow/:targetId', loginRequired, followController.delete);

export default router;
