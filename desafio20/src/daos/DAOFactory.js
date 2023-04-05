import ProductsMemDao from "./productsMem.dao.js";
import ProductsMongoDao from "./producsMongo.dao.js";
import CartMemDao from "./cartMem.dao.js";
import CartMongoDao from "./cartMongo.dao.js";
import UserMongoDao from "./userMongo.dao.js";
import UserMemDao from "./userMem.dao.js"

export class CartDaoFactory {
  static getClient(daoType) {
    switch (daoType) {
      case "MONGO":
        return new CartMongoDao();
      case "MEM":
        return new CartMemDao();
    }
  }
}

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

export class UserDaoFactory {
  static getClient(daoType) {
    switch (daoType) {
      case "MONGO":
        return new UserMongoDao();
      case "MEM":
        return new UserMemDao();
    }
  }
}