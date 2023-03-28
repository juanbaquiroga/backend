import Router from 'express';
import { controller } from '../controllers/index.js';
import { productValidations } from '../validations/index.js';

const router =  Router()

router.route('/').get(controller.getIndex)
router.route('/products').get(controller.productForm).post(productValidations.createProductValidations, controller.saveProd)
router.route('/cart').get( controller.cart).post(controller.cartPost)
router.route("/add").post(controller.addToCart);

export default router;