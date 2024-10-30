import express from "express"
import passport from "passport"
import middleware from "../middleware/validRole.js"
import cartController from "../controllers/cart.controller.js"

const router = express.Router()

router.get("/",
    passport.authenticate("jwt", { session: false }),
    middleware.validRoleUser,
    cartController.renderCart
)

export default router