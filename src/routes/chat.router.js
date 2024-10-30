import express from "express"
import passport from "passport"
import chatController from "../controllers/chat.controller.js"
import middleware from "../middleware/validRole.js"

const router = express.Router()

router.get("/", 
    passport.authenticate("jwt", { session: false }),
    middleware.validRoleUser,
    chatController.renderChat)

router.post("/", chatController.msgChat)  


export default router