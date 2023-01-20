import { Daos } from "../daos/index.js";
import { Products as ProductsModel } from "../model/Products.model.js";
import moment from 'moment'

const Products = new Daos.ProductsDao(ProductsModel);

const getAllProducts = async (req, res) => {
    console.log(Products)
  try {
    const response = await Products.getAll();

    res.json(response);
  } catch (err) {
    throw new Error();
  }
};

const getById = async (req, res) => {
    console.log(Products)
  try {
    const {id} = req.params
    const response = await Products.getById(id);

    res.json(response);
  } catch (err) {
    throw new Error();
  }
};
const createProduct = async (req, res) => {
    try {
        const { title,price, stock, code, img, description} = req.body;
        await Products.create({ title, price, code, stock, img, description, timestamp:moment().format('DD/MM/YYYY HH:mm:ss')});
        const response = await Products.getAll();
        res.json(response);
    } catch (err) {
        throw new Error();
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, stock, code, img, description } = req.body;
        await Products.update(id, { title, price, code, stock, img, description});
        const response = await Products.getById(id);
        res.json(response);
    } catch (err) {
        throw new Error();
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        Products.delete(id);
        const response = await Products.getAll();
        res.json(response);
    } catch (err) {
        throw new Error();
    }

    
};

export const ProductsController = { getAllProducts, createProduct, updateProduct, deleteProduct, getById };