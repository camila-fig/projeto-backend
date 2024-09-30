import express from "express"
import cartService from "../service/cart.service.js"
import validCart from "../middleware/validCart.js"
//import cartController from "../controllers/cartController.js"

const router = express.Router()

//Rotas com FileSystem
//router.get("/", cartController.productsInCart)
//router.post("/", cartController.createCart)
//router.get("/:cid", cartController.getById)
//router.post("/:cid/product/:pid", validCart, cartController.addToCart)

//Rotas com Mongoose
router.get("/:email", validCart, async (req, res) => { 
    const { email } = req.cookie
    const cart = await cartService.addProductToCart(pid, cid)
    
    res.render("cart") })

export default router