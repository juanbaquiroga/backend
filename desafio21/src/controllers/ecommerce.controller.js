import { productService} from '../services/index.js'



const getProducts = async (req, res, next)=>{
    try {
        const products = await productService.findAllProducts();
        res.json(products)
    } catch (err) {
        next(err);
    }
}

const saveProd = (req, res, next)=>{
    try {
    const {name, price, stock, img} = req.body;
    productService.createProduct({ name, price, stock, img})

    res.send('product created')
} catch (err) {
    next(err)
}
}

const deleteProduct = (req, res, next)=>{
    try{
        const {id} = req.body
        productService.deleteProduct(id)
        res.send('product deleted')
    } catch (err) {
        next(err)
    }
}

const updateProduct = (req, res, next)=>{
    try {
    const {name, price, stock, img, id} = req.body;
    productService.updateProduct(id, { name, price, stock, img})

    res.send('product updated')
} catch (err) {
    next(err)
}
}


export {getProducts, saveProd, deleteProduct, updateProduct}