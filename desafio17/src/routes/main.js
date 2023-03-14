import { Router } from 'express';
import { controller } from '../controllers/index.js';

const router = Router()

router.get('/api/productos-test', controller.getTestData);
router.get('/info', controller.getInfo)
export default router;