import { UserDaoFactory } from "../daos/DAOFactory.js";
import CustomError from "../classes/CustomError.class.js";
import config from '../config/config.js'

const DAO = UserDaoFactory.getClient(config.database);


const createUser = async (createUserRequest) => {
    try {
        const createdUser = await DAO.create(createUserRequest);
        return createdUser;
    } catch (err) {
        throw new CustomError(500, "The username you provided is not valid");
    }
};

const verifyUsername = async(username) =>{
    try{
        const existingUser = await DAO.checkUsername(username);
        return existingUser
    }catch(err){
        throw new CustomError(500, "The username you provided is not valid");
    }
}


const findUserByFilter = async (username) => {
    try {
        const user = await DAO.getByFilter(username);
        
        if (!user) {
            throw new CustomError(500, "The user don`t exist");
        }
        return user;
    } catch (err) {
        throw err;
    }
};

export const userService = {
    createUser,
    findUserByFilter,
    verifyUsername
};