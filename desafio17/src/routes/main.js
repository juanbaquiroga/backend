import { Router } from 'express';
import { controller } from '../controllers/controller.js';
import { middlewares } from '../middlewares/index.js';
import logger from '../lib/logger.js';
import passport from 'passport'

const router = Router()

router.get('/', middlewares.isLogin, controller.getHome);
router.get('/api/productos-test', controller.getTestData);
router.get('/logout', controller.logout);
router.get('/user', middlewares.isLogin, controller.user)
router.get('/fail-login', controller.loginFailure)
router.get('/fail-register', controller.registerFailure)
router.get('/info', controller.getInfo)
router.get('api/randoms', controller.getRandom)
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
router.get("*", (req, res) => {
    res.status(404).send("Sorry this route does no exist")
})

export default router;