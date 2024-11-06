import express from "express"
import passport from "passport"
import middleware from "../middleware/validRole.js"
import validCart from "../middleware/validCart.js"
import cartController from "../controllers/cart.controller.js"

const router = express.Router()

router.get("/",
    passport.authenticate("jwt", { session: false }),
    middleware.validRoleUser,
    cartController.productsCart
)

//Com fs
//router.get("/", cartController.productsInCart)

router.post("/",
    passport.authenticate("jwt", { session: false }),
    cartController.addCart
)

//Com fs
//router.post("/", cartController.createCart)

//router.get("/:cid", cartController.getById)

//router.post("/:cid/product/:pid", validCart, cartController.addToCart)

export default router