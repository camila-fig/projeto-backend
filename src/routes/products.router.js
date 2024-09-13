import express from "express"
//import validProduct from "../middleware/validProduct.js"
//import productController from "../controllers/productController.js"
import cartService from "../service/cart.service.js"

const router = express.Router()

//Rotas com FileSystem
//router.get("/", productController.getAllProducts)
//router.get("/find", productController.getLimitProducts)
//router.get("/:pid", productController.getById)
//router.post("/", validProduct, productController.createProduct)
//router.put("/:pid", productController.updateProductById)
//router.delete("/:pid", productController.deleteProduct)

//Rotas com Mongoose
router.post("/", async (req,res) => {
    const product = req.body
    const cart = await cartService.addProductToCart({pid})
    res.json("adicionado com sucesso")
})

export default router