import express from "express"
import passport from "passport"

const router = express.Router()

router.get("/github",
    passport.authenticate('github', { scope: ['user:email'] }),
    async (req, res) => {
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

router.get("/githubcallback",
    passport.authenticate('github', { failureRedirect: '/' }),
    async (req, res) => {
        req.session.user = req.user;
        res.redirect('/')
    })

export default router