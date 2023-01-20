import { Daos } from "../daos/index.js";
import { Cart as CartModel } from "../model/cart.model.js";

const Cart = new Daos.CartDao(CartModel);

const getAllCarts = async (req, res) => {
  try {
    const response = await Cart.getAll();

    res.json(response);
  } catch (err) {
    throw new Error();
  }
};

const createCart = async (req, res) => {
    try {
        const { timestamp, products } = req.body;
        await Cart.create({ timestamp, products });
        const response = await Cart.getAll();
        res.json(response);
    } catch (err) {
        throw new Error();
    }
};
const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { timestamp, products } = req.body;
        await Cart.update({ timestamp, products }, id);
        return "update realizado";
    } catch (err) {
        throw new Error();
    }
};

const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        await Cart.delete(id);
        return "delete realizado";
    } catch (err) {
        throw new Error();
    }
}; 

export const CartController = { getAllCarts, createCart, updateCart, deleteCart };

