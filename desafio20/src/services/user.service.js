import { UserDaoFactory } from "../daos/DAOFactory.js";
import CustomError from "../classes/CustomError.class.js";
import config from '../config/config.js'

const DAO = UserDaoFactory.getClient(config.database);


const createUser = async (createUserRequest) => {
    console.log('create user');
    try {
        const { username } = createUserRequest;
        console.log(username)

        const createdUser = await DAO.create(createUserRequest);
        console.log('user created')
        return createdUser;
    } catch (err) {
        throw new CustomError(500, "The username you provided is not valid");
    }
};

const verifyUsername = async(username) =>{
    console.log('existing username')
    try{
        const existingUser = await DAO.checkUsername(username);
        console.log('existing username 2' + existingUser)
        return existingUser
    }catch(err){
        throw new CustomError(500, "The username you provided is not valid");
    }
}


const findUserByFilter = async (username) => {
    try {
        console.log('find user by filter')
        const user = await DAO.getByFilter(username);
        
        console.log('find user by filter2')
        if (!user) {
            throw new CustomError(500, "The user don`t exist");
        }
        console.log('find user by filter3')
        console.log(user)
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