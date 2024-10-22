import express from "express"
import passport from "passport"
import cartController from "../controllers/cart.controller.js"

const router = express.Router()

router.get("/",
    passport.authenticate("jwt", { session: false }),
    cartController.renderCart
)

export default router