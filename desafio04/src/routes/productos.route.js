import {Router} from 'express'


const router = Router()

let products =[{
    title:"producto 1",
    price:123,
    thumbnail:"producto 1.jpg",
    id: 1
},{
    title:"producto 2",
    price:234,
    thumbnail:"producto 2.jpg",
    id: 2
}]

router
    .route('/')
    .get((req, res)=>{
        res.json(products)
    })
    .post((req, res)=>{
        const {title, price, thumbnail} = req.body;

        if(!title || !price || !thumbnail){
            return res.status(400).send('you must send title, price and thumbnail')
        }
        const newId = products[products.length -1].id + 1;
        const newProduct = {id: newId, title, price, thumbnail}
        const response = {
            status: 'created',
            data: newProduct
        }

        products.push(newProduct)
        res.status(201).json(response)
        console.log(response)
    })

router
    .route('/:id')
    .get((req,res)=>{
        let {id} = req.params;
        const verify = products.some((e) => e.id === Number(id));
        let result;
        let status;
        verify
            ?((result = products.find((e) => e.id == Number(id))), (status = 200))
            :((result = { error: 'product not found' }), (status = 400));
        res.status(status).json(result);
    })
    .delete((req,res)=>{
        let {id} = req.params;
        const verify = products.some((e) => e.id === Number(id))
        let result;
        let status;
        if(verify){
            let newArr = products.filter((product) => product.id !== Number(id))
            products = [...newArr]
            result = products
            status = 200;
        }else{
            result = { error: "product not found" };
            status = 400;
        }
        res.status(status).json(result);
    })
    .put((req, res)=>{
        let {id} = req.params;
        const { title, price, thumbnail } = req.body;
        const verify = products.some((e) => e.id === Number(id));
        let result;
        let status;
        
        if (verify) {
            result = products.find((e) => e.id === Number(id));
            const index = products.indexOf(result);
            result = {
            title,
            price,
            thumbnail,
            id: Number(id),
            };
            products.splice(index, 1, result);
            status = 200;
        } else {
            result = { error: "product not found" };
            status = 400;
        }
        res.status(status).json(result);
    })

export default router