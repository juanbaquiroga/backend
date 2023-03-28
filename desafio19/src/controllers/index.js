import { getIndex, productForm, saveProd, addToCart, cart, cartPost } from './ecommerce.controller.js';
import { login, register, user, logout } from './users.controller.js';

export const controller = {getIndex, login, register, user, productForm, saveProd, addToCart, logout, cart, cartPost}