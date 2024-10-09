import express from "express"
import passport from "passport"
import { generateToken } from "../utils/jsonwebtoken.js"

const router = express.Router()

router.get("/github",
    passport.authenticate('github', { scope: ['user:email'] }),
    async (req, res) => {
        const user = req.body
        const accessToken = generateToken(user)
        return res
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60,
            })
            .render("msgConected", { name: req.user.name })
    })

export default router