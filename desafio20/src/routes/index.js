import Router from 'express';
import ecommerceRouter from './ecommerce.routes.js'
import usersRouter from './user.routes.js'


const router =  Router()

router.use('/', ecommerceRouter)
router.use('/', usersRouter)

export default router;