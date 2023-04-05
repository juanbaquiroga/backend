import Router from 'express';
import { controller } from '../controllers/index.js';
import passport from 'passport';


const router =  Router()

router.get('/user', controller.user)
router.get('/logout', controller.logout);
router.route('/login').get(controller.login).post(passport.authenticate("login", { failureRedirect: "/fail-login" }), controller.login);
router.route('/register').get(controller.register).post(passport.authenticate('register', {failureRedirect:'/fail-register'}),controller.register)
export default router;