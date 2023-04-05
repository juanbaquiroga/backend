import DAO from "../classes/DAO.class.js";

export default class NewsMemDao extends DAO {
    constructor() {
        super();
        this.collection = [];
    }

    async getAll(){
        return this.collection;
    }

    async create(prodToCreate) {
        let id = this.collection.length()? this.collection.length() - 1 : 1 
        try {
            const createdDocument = this.collection.push({ ...prodToCreate, id:id });
    
            return createdDocument;
        }catch{
            throw new CustomError(500, "Error creating product");
        }
    }

    async getById(id){
        try {
            const product = this.collection.forEach(product => {
                if(product.id === id){
                    return product;
                }
            })
        
            return product;
        } catch (err) {
            throw new CustomError(500, "Error getting product");
        }
    }

    async getByFilter(filter){
        try {
            const product = this.collection.forEach(product => {
                if(product.name === filter){
                    return product;
                }
            })
        
            return product;
        } catch (err) {
            throw new CustomError(500, "Error getting product");
        }
    }

    async deleteOne(id) {
        try {
            for (let i = 0; i < this.collection.length; i++) {
                if (this.collection[i].id === id) {
                  this.collection.splice(i, 1);
                  return
                }
            }
        
            return true;
        } catch (err) {
            throw new CustomError(500, "Error deleting product");
        }
    }
}

    