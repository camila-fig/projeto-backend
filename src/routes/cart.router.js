import express from "express"
import passport from "passport"
import middleware from "../middleware/validRole.js"
import cartController from "../controllers/cart.controller.js"

const router = express.Router()

router.get("/",
    passport.authenticate("jwt", { session: false }),
    middleware.validRoleUser,
    cartController.productsCart
)

router.post("/",
    passport.authenticate("jwt", { session: false }),
    cartController.addCart
)

router.put("/remove/:pid",
    passport.authenticate("jwt", { session: false }),
    cartController.updateCart)

router.post("/finalize",
    passport.authenticate("jwt", { session: false }),
    cartController.finalizePurchase)

export default router