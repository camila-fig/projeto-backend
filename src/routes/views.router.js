import express from "express"
import passport from "passport"
import middleware from "../middleware/validRole.js"
import userController from "../controllers/user.controller.js"
import productController from "../controllers/product.controller.js"
import mailController from "../controllers/mail.controller.js"

const router = express.Router()

router.get("/", userController.renderLogin)

router.get("/admin",
    passport.authenticate("jwt", { session: false }),
    middleware.validRoleAdmin,
    productController.showOrganizedProducts)

router.get("/logout", userController.logout)

router.get("/edit/:pid", productController.showProducysById)

router.get("/mail", 
    passport.authenticate("jwt", { session: false }),
    middleware.validRoleAdmin,
    mailController.renderMail)

export default router