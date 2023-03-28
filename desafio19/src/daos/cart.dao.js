import logger from "../lib/logger.lib.js";
import { Cart } from "../models/index.js";

const createCart = async (createCartRequest) => {
  try {
    const createCart = await Cart.create(createCartRequest);

    return createCart;
  } catch (err) {
    logger.error('error al crear carrito');
  }
};

const pushToCart = async (username, updateCartRequest) => {
    try {
        await Cart.updateOne(
            {username: username},
            { $push: { products: updateCartRequest } }
        )
        logger.info(`product added to cart: ${updateCartRequest}`)
        return updateCartRequest
    }
    catch (err) {
        logger.error(`error al añadir al carrito`)
    }
};
const resetCart = async (username) => {
    try {
        await Cart.updateOne(
            {username: username},
            { $set: { products: [] } }
        )
        return;
    }
    catch (err) {
        logger.error(`error al vaciar carrito`)
    }
};

const deleteCart = async (id) => {
  try {
    const deletedCart = await Cart.deleteOne({ _id: id });

    return deletedCart;
  } catch (err) {
    logger.error('error al borrar carrito');
  }
};

const findAllCarts = async () => {
  try {
    const products = await Cart.find();

    return products;
  } catch (err) {
    console.log(err);
  }
};

const findCartById = async (id) => {
  try {
    const product = await Cart.findById(id);

    return product;
  } catch (err) {
    console.log(err);
  }
};

const findCartByFilter = async (filters) => {
  try {
    const product = await Cart.findOne(filters);

    return product;
  } catch (err) {
    console.log(err);
  }
};

export const CartDao = {
    createCart,
    pushToCart,
    deleteCart,
    findAllCarts,
    findCartById,
    resetCart,
    findCartByFilter
};
