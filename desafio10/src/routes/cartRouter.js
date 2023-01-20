import { Router } from "express";
import { cartController } from "../../../20-preentrega-2/controllers/cart.controller.js";

const router = Router()

router.route('/').get().post(cartController.createCart)

export default router