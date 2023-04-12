import Router from 'express';
import ecommerceRouter from './ecommerce.routes.js'


const router =  Router()

router.use('/', ecommerceRouter)

export default router;