import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";

const router = Router()

router.route('/').get(ProductsController.getAllProducts).post(ProductsController.createProduct)
router.route('/:id').get(ProductsController.getById).put(ProductsController.updateProduct).delete(ProductsController.deleteProduct)

export default router