import ProductsMongoDao from "./productsMongo.dao.js";



export class ProductDaoFactory {
  static getClient(daoType) {
    switch (daoType) {
      case "MONGO":
        return new ProductsMongoDao();
      case "MEM":
        return new ProductsMongoDao();
    }
  }
}
