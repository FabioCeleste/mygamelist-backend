import { Router } from 'express';

import ProfPicController from '../controllers/ProfPicController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/profile_pic', loginRequired, ProfPicController.store);

export default router;
