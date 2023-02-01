import { Router } from 'express';

const router = Router()

router.route('/login')
    .get((req, res) => {
        res.render('login')
    })
    .post((req, res) => {
        const {user} = req.body;
        if (user) req.session.user = user;
        res.redirect('/')
    })

router.route('/logout')
    .get((req, res) => {
        const user = req.session.user;
        req.session.user = null;
        res.render('logout', {user})
    })

router.route
export default router;