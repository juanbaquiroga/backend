import Router from 'express';
import { controller } from '../controllers/index.js';
import passport from 'passport';

const router =  Router()

router.route('/').get(controller.getIndex)
router.get('/user', controller.user)
router.route('/products').get(controller.productForm).post(controller.saveProd)
router.get('/logout', controller.logout);
router.route('/cart').get( controller.cart).post(controller.cartPost)
router.route('/login')
    .get(controller.login)
    .post(passport.authenticate("login", { failureRedirect: "/fail-login" }), controller.login);
router.route('/register')
    .get(controller.register)
    .post(passport.authenticate('register', {failureRedirect:'/fail-register'}),controller.register)
router.route("/add")
    .post(controller.addToCart);
export default router;