import { Product } from "../models/index.js";
import logger from "../lib/logger.lib.js";

const createProduct = async (createProductRequest) => {
  try {
    const createdProduct = await Product.create(createProductRequest);
    logger.info(`new product created: ${createdProduct}`)
    return createdProduct;
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (id, updateProductRequest) => {
  try {
    const updatedProduct = await Product.updateOne({ _id: id }, updateProductRequest);

    return updatedProduct;
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (id) => {
  try {
    const deletedProduct = await Product.deleteOne({ _id: id });

    return deletedProduct;
  } catch (err) {
    console.log(err);
  }
};

const findAllProducts = async () => {
  try {
    const products = await Product.find().lean();

    return products;
  } catch (err) {
    console.log(err);
  }
};

const findProductById = async (id) => {
  try {
    const product = await Product.findById(id);

    return product;
  } catch (err) {
    console.log(err);
  }
};

const findProductByFilter = async (filters) => {
  try {
    const product = await Product.findOne(filters);

    return product;
  } catch (err) {
    console.log(err);
  }
};

export const ProductDao = {
    createProduct,
    updateProduct,
    deleteProduct,
    findAllProducts,
    findProductById,
    findProductByFilter
};
