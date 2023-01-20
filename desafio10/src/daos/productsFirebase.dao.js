import { FirebaseDao } from "./firebase.dao.js";

export class ProductsFirebaseDao extends FirebaseDao {
    constructor() {
        super("products");
    }
}