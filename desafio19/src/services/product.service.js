import { ProductDao } from "../daos/index.js";

const createProduct = async (createProductRequest) => {
  try {
    const { name } = createProductRequest;
    const existingProduct = await ProductDao.findProductByFilter({ name });

    if (existingProduct) {
      throw {
        message: "The product you want to create already exists",
        status: 400,
      };
    }

    const createdProduct = await ProductDao.createProduct(createProductRequest);

    return createdProduct;
  } catch (err) {
    console.log(err);

    throw err;
  }
};

const updateProduct = async (updateProductRequest, id) => {
  try {
    const existingProduct = await ProductDao.findProductById(id);

    if (!existingProduct) {
      throw {
        message: "The product you want to update does not exist",
        status: 400,
      };
    }

    const updatedProduct = await ProductDao.updateProduct(id, updateProductRequest);

    return updatedProduct;
  } catch (err) {
    console.log(err);

    throw err;
  }
};

const deleteProduct = async (id) => {
  try {
    const existingProduct = ProductDao.findProductById(id);

    if (!existingProduct) {
      throw {
        message: "The product you want to delete does not exist",
        status: 400,
      };
    }

    const deletedProduct = await ProductDao.deleteProduct(id);

    return deletedProduct;
  } catch (err) {
    console.log(err);

    throw err;
  }
};

const findAllProducts = async () => {
  try {
    const products = await ProductDao.findAllProducts();

    return products;
  } catch (err) {
    console.log(err);

    throw err;
  }
};

const findProductById = async (id) => {
  try {
    const product = await ProductDao.findProductById(id);

    if (!product) {
      throw {
        message: "The product you want to create already exists",
        status: 404,
      };
    }

    return product;
  } catch (err) {
    console.log(err);

    throw err;
  }
};

export const productService = {
  createProduct,
  updateProduct,
  deleteProduct,
  findAllProducts,
  findProductById,
};
