import { Products } from "../model/Products.model.js";
import { MongoDao } from "./mongo.dao.js";

export class ProductsMongoDao extends MongoDao {
    constructor() {
        super(Products);
    }
}
