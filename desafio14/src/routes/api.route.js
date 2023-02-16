import Router from 'express'
import { controller } from '../controllers/api.controller.js'


const router = Router()


router.get('/randoms',controller.getRandom)


export default router;