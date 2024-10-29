import express from "express"
import passport from "passport"
import middleware from "../middleware/validRole.js"
import chatController from "../controllers/chat.controller.js"
import userController from "../controllers/user.controller.js"
import productController from "../controllers/product.controller.js"

const router = express.Router()

router.get("/", userController.renderLogin)

router.get("/chat", 
    passport.authenticate("jwt", { session: false }),
    middleware.validRoleUser,
    chatController.renderChat)

router.get("/admin",
    passport.authenticate("jwt", { session: false }),
    middleware.validRoleAdmin,
    productController.showOrganizedProducts)

router.get("/logout", userController.logout)

router.get("/edit/:pid", productController.showProducysById)

export default router