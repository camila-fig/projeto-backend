import express from "express"
import validProduct from "../middleware/validProduct.js"
import productController from "../controllers/productController.js"

const router = express.Router()

router.get("/", productController.getAllProducts)

router.get("/limit", productController.getLimitProducts)

router.get("/:pid", productController.getById)

router.post("/", validProduct, productController.createProduct)

router.put("/:pid", productController.updateProductById)

router.delete("/:pid", productController.deleteProduct)

export default router