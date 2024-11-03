import express from "express"
import validProduct from "../middleware/validProduct.js"
import productController from "../controllers/product.controller.js"
import passport from "passport"
import cartController from "../controllers/cart.controller.js"

const router = express.Router()

router.get("/:title/:page/:limit", productController.showProducts)

router.get("/:pid", productController.showAProduct)

router.post("/", validProduct, productController.createProduct)

router.delete("/:pid", productController.deleteProduct)

router.put("/:pid", validProduct, productController.updateProduct)

export default router