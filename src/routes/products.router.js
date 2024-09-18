import express from "express"
//import validProduct from "../middleware/validProduct.js"
//import productController from "../controllers/productController.js"
import productsService from "../service/products.service.js"

const router = express.Router()

//Rotas com FileSystem
//router.get("/", productController.getAllProducts)
//router.get("/find", productController.getLimitProducts)
//router.get("/:pid", productController.getById)
//router.post("/", validProduct, productController.createProduct)
//router.put("/:pid", productController.updateProductById)
//router.delete("/:pid", productController.deleteProduct)

//Rotas com Mongoose
// router.get("/:title/:page/:limit", async (req, res) => {
//     const { title, page, limit } = req.params
//     const products = await productsService.getProducts(title, page, limit)
//     return res.status(200).json({ message: products })
// })

export default router