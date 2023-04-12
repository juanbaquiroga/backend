import Router from 'express';
import { controller } from '../controllers/index.js';
import { productValidations } from '../validations/index.js';

const router =  Router()

router.route('/products')
    .get(controller.getProducts)
    .post(productValidations.createProductValidations, controller.saveProd)
    .delete(controller.deleteProduct)
    .put(controller.updateProduct)

export default router;