import CustomError from "../classes/CustomError.class.js";
import DAO from "../classes/DAO.class.js";
import { User } from "../models/index.js";

export default class UserMongoDao extends DAO {
    constructor() {
        super();
        this.collection = User;
    }
    
    async create(createUserRequest) {
        console.log('create dao');
        try {
            const createdUser = await this.collection.create(createUserRequest);
            return createdUser;
        } catch (err) {
            throw new CustomError(500, "Error creating user");
        }
    }
    
    async checkUsername(username){
        const user = await this.collection.findOne({username:username});
        if(user){
            return true
        }else{
            return false
        }
    }
    async getByFilter(filters){
        try {
            const user = await this.collection.findOne(filters);
            
            return user
        } catch (err) {
            throw new CustomError(500, "Error getting user");
        }
    }
}
