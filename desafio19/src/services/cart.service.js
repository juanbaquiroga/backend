import { CartDao } from "../daos/index.js";

const createCart = async (createCartRequest) => {
  try {
    const { title } = createCartRequest;
    const existingCart = await CartDao.findCartByFilter({ title });

    if (existingCart) {
      throw {
        message: "The Cart you want to create already exists",
        status: 400,
      };
    }

    const createdCart = await CartDao.createCart(createCartRequest);

    return createdCart;
  } catch (err) {
    console.log(err);

    throw err;
  }
};

const pushToCart = async (username, updateCartRequest) => {
  try {
    const existingCart = await CartDao.findCartByFilter({username: username});

    if (!existingCart) {
      throw {
        message: "The Cart you want to update does not exist",
        status: 400,
      };
    }

    const updatedCart = await CartDao.pushToCart(username, updateCartRequest);

    return updatedCart;
  } catch (err) {
    console.log(err);

    throw err;
  }
};

const deleteCart = async (id) => {
    try {
        const existingCart = CartDao.findCartById(id);
        
        if (!existingCart) {
            throw {
                message: "The Cart you want to delete does not exist",
                status: 400,
            };
        }
        
        const deletedCart = await CartDao.deleteCart(id);
        
        return deletedCart;
    } catch (err) {
        console.log(err);
        
        throw err;
    }
};

const resetCart = async (username) => {
  try {
    const existingCart = await CartDao.findCartByFilter({username: username});

    if (!existingCart) {
      throw {
        message: "The Cart you want to update does not exist",
        status: 400,
      };
    }

    await CartDao.resetCart(username);

    return;
  } catch (err) {
    console.log(err);
  }
};

const findAllCarts = async () => {
    try {
        const carts = await CartDao.findAllCarts();
        
    return carts;
} catch (err) {
    console.log(err);
    
    throw err;
}
};

const findCartById = async (id) => {
    try {
    const cart = await CartDao.findCartById(id);

    if (!cart) {
      throw {
        message: "The Cart you want to create already exists",
        status: 404,
      };
    }

    return cart;
  } catch (err) {
    console.log(err);

    throw err;
  }
};
const findCartByFilter = async (filter) => {
    try {
      const cart = await CartDao.findCartByFilter(filter);
  
      if (!cart) {
        throw {
          message: "The cart don`t exist",
          status: 404,
        };
      }
  
      return cart;
    } catch (err) {
      console.log(err);
  
      throw err;
    }
  };
  

export const cartService = {
  createCart,
  pushToCart,
  deleteCart,
  findAllCarts,
  findCartById,
  resetCart,
  findCartByFilter,
};
