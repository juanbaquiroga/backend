import { config } from "../config/config.js";
import { CartMongoDao } from "./CartMongo.dao.js";
import { ProductsMongoDao } from "./ProductsMongo.dao.js";
import { CartFirebaseDao } from "./cartFirebase.dao.js";
import { ProductsFirebaseDao } from "./productsFirebase.dao.js";

let CartDao;
let ProductsDao;

if (config.database === "MONGO") {
  CartDao = CartMongoDao;
  ProductsDao = ProductsMongoDao;
} else {
  CartDao = CartFirebaseDao;
  ProductsDao = ProductsFirebaseDao;
}

export const Daos = { CartDao, ProductsDao };
