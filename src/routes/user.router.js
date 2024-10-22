import express from "express"
import validUser from "../middleware/validUser.js"
import passport from "passport"
import userController from "../controllers/user.controller.js"

const router = express.Router()

router.post("/login", userController.login)

router.post("/",
    passport.authenticate("register", { failureRedirect: "user/failregister" }),
    validUser,
    userController.createUser
)

router.get("/failregister", userController.failregister)

export default router