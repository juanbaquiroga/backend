import fs from 'fs'
import moment from 'moment'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


class Api{
    constructor(ruta){
        this.ruta = ruta;
    }
    
    async save(obj){
        let newId
        const list = await this.getAll()
        
        if(list.length > 0 && list.some((element) => element.title === obj.title)){
            console.log("el producto ya se encuentra en el catalogo");
            return
        }
        else if(list.length === 0) {
            newId = 1
        }
        else {
            newId = list[list.length - 1].id + 1
        }
        
        const objId = {...obj, id: newId}
        list.push(objId)
        
        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify(list, null, 2))
            return newId
        }catch(err){
            throw new Error(`Error al guardar un nuevo objeto: ${err}`)
        }
    }
    
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.ruta,'utf8')
            return JSON.parse(data)
        }catch(err){
            return[]
        }
    }
    
    async getById(id){
        try{
            const list = await this.getAll()
            const item = list.find(e => e.id === id) ?? null
            return item
        }catch (err) {
            throw new Error(`No se encontro el producto \n error:${err}`)
        }
    }
    
    async deleteById(id){
        const list = await this.getAll();
        const listFilter = list.filter((item) => item.id !== id)
        try {
            await fs.promises.writeFile(this.ruta, `${JSON.stringify(listFilter, null, 2)}`)
            console.log('producto borrado con exito')
        } catch (err) {
            throw new Error(`Error al borrar data: ${err}`)
        }
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.ruta, [])
            console.log('borrado con exito')
        }catch(err){
            throw new Error(`Error al borrar data: ${err}`)
        }
    }
    async updateDocument(list){
        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify(list, null, 2))
        }catch(err){
            throw new Error(`Error al actualizar data: ${err}`)
        }
    }
}


const api = new Api(join(__dirname, '/products.txt'))

export class Cart{
    constructor(ruta){
        this.ruta = ruta;
    }
    async create(){
        let newId
        const list = await this.getAll()
        
        if(list.length === 0) {
            newId = 1
        }
        else {
            newId = list[list.length - 1].id + 1
        }
        const obj = {id: newId, timestamp: moment().format('DD/MM/YYYY HH:mm:ss'), products: []}
        list.push(obj)
    
        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify(list, null, 2))
            return {'id de carrito': newId}
        }catch(err){
            throw new Error(`Error al guardar un nuevo objeto: ${err}`)
        }
    }
    
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.ruta,'utf8')
            return JSON.parse(data)
        }catch(err){
            return[]
        }
    }
    async getAllProducts(id){
        try{ 
            const list = await this.getAll()
            const cart = list.find(e => e.id === id) ?? null
            if(cart){
                return cart.products
            }else{
                return {error: 'el carrito especificado no existe'}
            }
        }catch(err){
            throw new Error(`No se encontro el carrito \n error:${err}`)
        }
    }
    async appendProduct(idCart, idProd){
        try {
            const list = await this.getAll()
            const cart = list.find(e => e.id === idCart) ?? null
            
            const products = await api.getAll()
            console.log(products)
            const product = products.find(product => product.id == idProd)
            cart.products.push(product)
            const response = {
                idCart,
                product
            }
            await fs.promises.writeFile(this.ruta, JSON.stringify(list, null, 2))
            return response
        } catch (err) {
            throw new Error(`Error al agregar producto: ${err}`)
        }
        
    }
    
    
    async deleteById(id){
        const list = await this.getAll();
        const listFilter = list.filter((item) => item.id !== id)
        try {
            await fs.promises.writeFile(this.ruta, `${JSON.stringify(listFilter, null, 2)}`)
            return {'id cart deleted':id}
        } catch (err) {
            throw new Error(`Error al borrar data: ${err}`)
        }
    }
    async deleteProduct(idCart, idProd){
        const index = idCart - 1
        const list = await this.getAll();
        const cart = list.filter(e => e.id == idCart)
        const products = cart[0].products.filter((e)=> e.id !== idProd)
        const newCart = {id: idCart, timestamp:moment().format('DD/MM/YYYY HH:mm:ss'), products}
        list[index] = newCart

        
        try{
            await fs.promises.writeFile(this.ruta, `${JSON.stringify(list, null, 2)}`)
            return 'producto borrado con exito'
        }catch(err){
            throw new Error(`Error al borrar data: ${err}`)
        }
    }
    

}


export default Api