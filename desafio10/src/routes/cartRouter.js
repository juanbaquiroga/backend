import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";

const router = Router()

router.route('/').get(CartController.getAllCarts).post(CartController.createCart)
router.route('/:id').post(CartController.addToCart).delete(CartController.deleteCart).get(CartController.getById)

export default router   