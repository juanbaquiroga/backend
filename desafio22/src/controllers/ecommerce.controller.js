import { productService} from '../services/index.js'



const getProducts = async ()=>{
    try {
        const products = await productService.findAllProducts();
        return products
    } catch (err) {
        console.log(err)
        throw 'error getting all products'
    }
}

const getById = async ({id})=>{
    try{
        const product = await productService.findProductById(id);
        return product
    }catch(err){
        console.log(err)
        throw 'error getting the product'
    }
}




const saveProd = ({prodData})=>{
    try {
    const {name, price, stock, img} = prodData;
    const product = productService.createProduct({ name, price, stock, img})

    return product
} catch (err) {
    console.log(err)
        throw 'error creating the product'
}
}

const deleteProduct = async ({id})=>{
    try{
        const product = await productService.findProductById(id);
        productService.deleteProduct(id)
        return product
    } catch (err) {
        console.log(err)
        throw 'error getting the product'
    }
}

const updateProduct = ({id, updateProdData})=>{
    try {
    
    const product = productService.updateProduct(id, updateProdData)

    return product
} catch (err) {
    console.log(err)
    throw 'error updating the product'
}
}


export {getProducts, saveProd, deleteProduct, updateProduct, getById}