import {Router} from 'express';
import {Cart} from '../api.js';
import { fileURLToPath } from 'url';
import { dirname, join } from "path";
import moment from 'moment';
import {admin} from '../server.js'
import { receiveMessageOnPort } from 'worker_threads';

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = Router()
const cart = new Cart(join(__dirname, '../carts.txt'))



const checkIsAdmin =(req, res, next)=>{
    if (admin ){
        next();
    }
    else{
        res.json({ 
            error : -1,
            descripcion: `ruta ${req.path} método ${req.method} no autorizada` 
        });
    }
}


router
    .route('/cart')
    .post(async(req, res)=>{
        res.json(await cart.create())
    })


router
    .route('/cart/:id')
    .delete(async(req, res)=>{
        const {id} = req.params
        res.json(await cart.deleteById(Number(id)))
    })

router
    .route('/cart/:id/products')
    .get(async(req,res)=>{
        const {id} = req.params
        res.json(await cart.getAllProducts(Number(id)))
    })
    .post(async (req, res)=>{
        const {id}= req.params
        const {productId} = req.body
        res.json(await cart.appendProduct(Number(id),Number(productId)))
    })
router 
    .route('/cart/:id/products/:productId')
    .delete(async(req,res)=>{
        const {id, productId} = req.params
        res.json(await cart.deleteProduct(Number(id), Number(productId)))
    })



export default router