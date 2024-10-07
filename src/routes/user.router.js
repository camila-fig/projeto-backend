import express from "express"
import validUser from "../middleware/validUser.js"
import { isValidatePassword } from "../utils/bcrypt.js"
import passport from "passport"
isValidatePassword

const router = express.Router()

router.post("/login",
    passport.authenticate("login", { failureRedirect: "/user/faillogin" }),
    async (req, res) => {
        if (!req.user)
            return res.status(400).json({ status: "error", message: "Unauthorized" })
        req.session.user = {
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
        }
        req.session.logged = true

        if (req.user.role === "admin") {
            req.session.admin = true
        } else {
            req.session.admin = false
        }
        return res.cookie("EmailLogged", req.user.email)
            .render("msgConected", { name: req.user.name })
    })

router.get("/faillogin", (req, res) => {
    console.log("Faliled Strategy")
    return res.status(404).render("msgConectedFail")
})

router.post("/",
    passport.authenticate("register", { failureRedirect: "/failregister" }),
    validUser,
    async (req, res) => {
        return res.cookie("EmailLogged", req.body.email)
            .render("msgConected", { name: req.body.name })
    })

router.get("/failregister", (req, res) => {
    console.log("faliled Strategy")
    res.send("Erro ao registrar")
})

export default router