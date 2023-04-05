import CustomError from "../classes/CustomError.class.js";
import DAO from "../classes/DAO.class.js";
import { Product } from "../models/index.js";
import ProductDTO from "../dtos/product.dto.js";
import getCurrencyPrice from "../utils/quoter.js";

export default class ProductsMongoDao extends DAO {
  constructor() {
    super();
    this.collection = Product;
  }

    // async getAll() {
    //     try {
    //         const products = await this.collection.find().lean();
        
    //         return products;
    //     } catch (err) {
    //         throw new CustomError(500, "Error getting Products");
    //     }
    // }
    
    async create(createProductRequest) {
        try {
            const createdProduct = await this.collection.create(createProductRequest);
            logger.info(`new product created: ${createdProduct}`)
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
  
    async getByFilter(filters){
        try {
            const product = await this.collection.findOne(filters);
        
            return product;
        } catch (err) {
            throw new CustomError(500, "Error getting product");
        }
    }
    async deleteOne(id){
        try {
            const deletedProduct = await this.collection.deleteOne({ _id: id });
        
            return deletedProduct;
        } catch (err) {
            throw new CustomError(500, "Error deleting product");
        }
    }
    async getAll() {
        try {
            const crudeData = await this.collection.find();
            const response = crudeData.map((product) => {
                const currencies = {
                usdPrice: getCurrencyPrice(product.price, "USD"),
                arsPrice: getCurrencyPrice(product.price, "ARS"),
                uyuPrice: getCurrencyPrice(product.price, "UYU"),
                };
        
                return new ProductDTO(product, currencies);
            });
        
            return response;
        } catch (err) {
            console.log("Error", err);
        }
    }
}
