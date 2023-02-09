import { Router } from 'express';
import { controller } from '../controllers/index.js';
import { middlewares } from '../middlewares/index.js';
import passport from 'passport'

const router = Router()

router.get('/', middlewares.isLogin, controller.getHome);
router.get('/api/productos-test', controller.getTestData);
router.get('/logout', controller.logout);
router.get('/user', middlewares.isLogin, controller.user)
router.get('/fail-login', controller.loginFailure)
router.get('/fail-register', controller.registerFailure)
router.route('/login')
    .get(controller.login)
    .post(
        passport.authenticate("login", { failureRedirect: "/fail-login" }),
        controller.login
    );


router.route('/register')
    .get(controller.register)
    .post(
        passport.authenticate('register', {failureRedirect:'/fail-register'}),
        controller.register
    )

export default router;