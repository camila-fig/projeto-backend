import express from "express"
import validUser from "../middleware/validUser.js"
import { isValidatePassword } from "../utils/bcrypt.js"
import { generateToken } from "../utils/jsonwebtoken.js"
import passport from "passport"
import userService from "../service/user.service.js"
import bcrypt from "bcrypt"
isValidatePassword

const router = express.Router()

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    let user = await userService.getUsersByEmail({email})
    user = [user].map((u) => u.toJSON());
    user = user[0];
    if (!user) {
        return res
            .status(404)
            .render("msgConectedFail")
    }
    const isPasswordValidTest = bcrypt.compareSync(password, user.password)
    if (!isPasswordValidTest) {
        return res
            .status(404)
            .render("msgConectedFail")
    }
    const accessToken = generateToken(user)
    console.log("User",user)
    return res
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        })
        .render("msgConected", { 
            name: user.name, 
            isAdmin: user.role === "admin",
            isUser: user.role === "user",
        })
})

router.post("/",
    passport.authenticate("register", { failureRedirect: "/failregister" }),
    validUser,
    async (req, res) => {
        const user = req.body
        const accessToken = generateToken(user)
        return res
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60,
            })
            .render("msgConected", { name: req.body.name })
    })

router.get("/failregister", (req, res) => {
    console.log("faliled Strategy")
    res.send("Erro ao registrar")
})

export default router