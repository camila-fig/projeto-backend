import express from "express"
//import validCart from "../middleware/validCart.js"
//import cartController from "../controllers/cartController.js"

const router = express.Router()

//Rotas com FileSystem
//router.get("/", cartController.productsInCart)
//router.post("/", cartController.createCart)
//router.get("/:cid", cartController.getById)
//router.post("/:cid/product/:pid", validCart, cartController.addToCart)


//Rotas com Mongoose
router.get("/:cid", (req, res) => { res.render("cart") })



export default router