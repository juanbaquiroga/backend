import CustomError from "../classes/CustomError.class.js";
import DAO from "../classes/DAO.class.js";
import { Product } from "../models/index.js";;

export default class ProductsMongoDao extends DAO {
  constructor() {
    super();
    this.collection = Product;
  }
    
    async create(createProductRequest) {
        try {
            const createdProduct = await this.collection.create(createProductRequest);
            return createdProduct;
        } catch (err) {
            throw new CustomError(500, "Error creating product");
          }
    }

    async getById(id){
        try {
            const product = await this.collection.findById(id);
        
            return product;
        } catch (err) {
            throw new CustomError(500, "Error getting product");
        }
    }
  
    async getByFilter(name){
        try {
            const product = await this.collection.findOne({name});
        
            return product;
        } catch (err) {
            throw new CustomError(500, "Error getting product");
        }
    }
    async delete(id){
        try {
            const deletedProduct = await this.collection.deleteOne({ _id: id });
        
            return deletedProduct;
        } catch (err) {
            throw new CustomError(500, "Error deleting product");
        }
    }
    async update(id, product){
        try {
            const updatedProduct = await this.collection.updateOne({ _id: id }, product);
            return updatedProduct
        }catch (err) {
            throw new CustomError(500, "Error updating product");
        }
    }
    async getAll() {
        try {
            const products = await this.collection.find();

            return products
        } catch (err) {
            console.log("Error", err);
        }
    }
}
