import ProductsMemDao from "./productsMem.dao.js";
import ProductsMongoDao from "./producsMongo.dao.js";



export class ProductDaoFactory {
  static getClient(daoType) {
    switch (daoType) {
      case "MONGO":
        return new ProductsMongoDao();
      case "MEM":
        return new ProductsMemDao();
    }
  }
}
