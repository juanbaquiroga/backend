import {Router} from 'express'
import Api from '../api.js'
import { fileURLToPath } from 'url';
import { dirname, join } from "path";
import moment from 'moment'
import {admin} from '../server.js'





const __dirname = dirname(fileURLToPath(import.meta.url));

const router = Router()
const api = new Api(join(__dirname, '../products.txt'))



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
    .route('/products')
    .get( async (req, res) =>{
        res.json(await api.getAll())
    })
    .post(checkIsAdmin, async(req, res)=>{
        const {title, price, img, description, code, stock} = req.body
        if(!title || !price || !img || !description || !code || !stock){
            return res.status(400).send('you must send title, price, img, description, code, stock')
        }
        const timestamp = moment().format('DD/MM/YYYY HH:mm:ss')
        const newProd = {title, price, img, description, code, timestamp, stock}
        await api.save(newProd)
        const response = {
            status: 'created',
            data: newProd
        }
        res.json(response)
    })

router
    .route('/products/:id')
    .get(async (req, res)=>{
        let {id} = req.params;
        const prod = await api.getById(Number(id))
        if (prod){
            res.status(200).json(prod);
        }else{
            res.status(400).json({error:'producto no encontrado'});
        }
    })
    .put(checkIsAdmin, async (req,res)=>{

        let {id}= req.params;
        const {title, price, img, description, code, stock} = req.body;
        const products = await api.getAll();
        const timestamp = moment().format('DD/MM/YYYY HH:mm:ss')
        const result = {
            title,
            price,
            img,
            description,
            code,
            stock,
            timestamp,
            id: Number(id),
        }
        products.splice(Number(id)-1, 1, result)
        await api.updateDocument(products)
        res.json(result)
    })
    .delete(checkIsAdmin, async (req, res)=>{
        let {id} = req.params;
        await api.deleteById(Number(id))
        res.status(200).json({mensaje:'producto eliminado con exito'})
    })

export default router