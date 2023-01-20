import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";

const router = Router()

router.route('/').get().post(CartController.createCart)

export default router