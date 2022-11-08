const { LOADIPHLPAPI } = require('dns');
const fs = require('fs');
const { it } = require('node:test');
const { json } = require('stream/consumers');

class contenedor{
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
            console.log(JSON.parse(data))
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
}



module.exports = contenedor