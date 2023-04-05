import DAO from "../classes/DAO.class.js";

export default class CartMemDao extends DAO {
  constructor() {
    super();
    this.collection = [];
  }

  async create(cartToCreate) {
    try {
        const createdDocument = this.collection.push(cartToCreate);
  
    return createdDocument;
    }catch{
        throw new CustomError(500, "Error creating cart");
    }
  }


    async getByFilter(username){
        try {
            const cart = this.collection.forEach(cart => {
                if(cart.username === username){
                    return cart;
                }
            })
        
            return cart;
        } catch (err) {
            throw new CustomError(500, "Error getting cart");
        }
    }
    
    async push(username, producto) {
        try {
            this.collection.forEach(cart => {
                if(cart.username === username){
                    cart.products.push(producto);
                }
            })
        
            return producto;
        } catch (err) {
            throw new CustomError(500, "Error updating cart");
        }
    }

    async reset(username) {
        try {
            this.collection.forEach(cart => {
                if(cart.username === username){
                    cart.products = [];
                }
            })
        
            return username;
        } catch (err) {
            throw new CustomError(500, "Error deleting cart");
        }
    }
}

  