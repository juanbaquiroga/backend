import { CartDaoFactory } from "../daos/DAOFactory.js";
import CustomError from "../classes/CustomError.class.js";
import config from "../config/config.js";

const DAO = CartDaoFactory.getClient(config.database)

const createCart = async (createCartRequest) => {
    try {
        const { username } = createCartRequest;
        const existingCart = await DAO.getByFilter( {username} );

        if (existingCart) {
            throw new CustomError(500, "The Cart you want to create already exists");
        }

        const createdCart = await DAO.create(createCartRequest);

        return createdCart;
    } catch (err) {
        throw err;
    }
};

const pushToCart = async (username, product) => {
    try {
        const existingCart = await DAO.getByFilter({username});
        if (!existingCart) {
            throw new CustomError(400, "The Cart you want to update does not exist");
        }
        await DAO.push(username, product);

        return;
    } catch (err) {
        throw err;
    }
};



const resetCart = async (username) => {
    try {
        const existingCart = await DAO.getByFilter({username});

        if (!existingCart) {
        throw new CustomError(500, "The Cart you want to update does not exist");
        }

        await DAO.reset(username);

        return;
    } catch (err) {
        throw err;
    }
};

const findCartByFilter = async (username) => {
    try {
        const cart = await DAO.getByFilter({username});

        if (!cart) {
            throw new CustomError(500, "The cart don`t exist");
        }

        return cart;
    } catch (err) {
        throw err;
    }
  };
  

export const cartService = {
    createCart,
    pushToCart,
    resetCart,
    findCartByFilter,
};
