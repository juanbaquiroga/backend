import {Router} from 'express'
import cartRouter from './cartRouter.js'
import productsRouter from './productsRouter.js'

const router = Router()

router.use('/cart', cartRouter)
router.use('/products', productsRouter)

export default router