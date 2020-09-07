import { Router } from 'express';

import resetController from '../controllers/ResetController';

const router = new Router();

router.post('/resetone', resetController.request);
router.post('/resettwo/:token', resetController.reset);

export default router;
