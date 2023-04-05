import { ProductDaoFactory } from "../daos/DAOFactory.js";
import CustomError from "../classes/CustomError.class.js";
import config from '../config/config.js'

const DAO = ProductDaoFactory.getClient(config.database);


const createProduct = async (createProductRequest) => {
    try {
        const { name } = createProductRequest;
        const existingProduct = await DAO.findOne({ name });

        if (existingProduct) {
            throw new CustomError(500, 'Product already exists');
        }

        const createdProduct = await DAO.create(createProductRequest);

        return createdProduct;
    } catch (err) {
        throw new CustomError(500, 'invalid credentials');
    }
};



const deleteProduct = async (id) => {
    try {
        const existingProduct = DAO.getById(id);

        if (!existingProduct) {
            throw new CustomError(500, 'the product dont exist')
        }

        const deletedProduct = await DAO.delete(id);

        return deletedProduct;
    } catch (err) {
        throw new CustomError(500, 'invalid credentials')
    }
};

const findAllProducts = async () => {
    try {
        const products = await DAO.getAll();

        return products;
    } catch (err) {
        throw new CustomError(500, 'products not found')
    }
};

const findProductById = async (id) => {
    try {
        const product = await DAO.getById(id);

        if (!product) {
            throw new CustomError(500, 'the product dont exist')
        }

        return product;
    } catch (err) {
        throw new CustomError(500, 'product not found')
    }
};

export const productService = {
    createProduct,
    deleteProduct,
    findAllProducts,
    findProductById,
};
