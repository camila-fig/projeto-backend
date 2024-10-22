import express from "express"
import passport from "passport"
import sessionController from "../controllers/session.controller.js"

const router = express.Router()

router.get("/github",
    passport.authenticate('github', { scope: ['user:email'] }),
    sessionController.tokenGit
)

export default router