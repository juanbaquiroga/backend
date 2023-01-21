import { Daos } from "../daos/index.js";
import { Cart as CartModel } from "../model/cart.model.js";
import moment from 'moment'
import { Products as ProductsModel } from "../model/Products.model.js";

const Cart = new Daos.CartDao(CartModel);

const getAllCarts = async (req, res) => {
  try {
    const response = await Cart.getAll();
    res.json(response);
  } catch (err) {
    throw new Error();
  }
};
const getById = async (req, res) => {
  try {
    const {id} = req.params
    const response = await Cart.getById(id);

    res.json(response);
  } catch (err) {
    throw new Error();
  }
};

const createCart = async (req, res) => {
    try {
        await Cart.create({ timestamp: moment().format('DD/MM/YYYY HH:mm:ss'), products: []});
        const response = await Cart.getAll();
        res.json(response);
    } catch (err) {
        throw new Error();
    } 
}; 
const addToCart = async (req, res)=>{
    try {
        const { id } = req.params;
        const { product } = req.body;
        const oldCart = await Cart.getById(id)

        const products = oldCart.products
        products.push(product)
        
        const cart = {timestamp:moment().format('DD/MM/YYYY HH:mm:ss'), products}
        await Cart.update(id, cart);
        const response = await Cart.getAll();
        res.json(response);
    } catch (err) {
        throw new Error();
    }  
} 
 


const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        await Cart.delete(id);
        const response = await Cart.getAll();
        res.json(response);
    } catch (err) {
        throw new Error();
    }
}; 

export const CartController = { getAllCarts, createCart, deleteCart, addToCart, getById};

