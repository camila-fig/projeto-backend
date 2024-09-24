import express from "express"
import userService from "../service/user.service.js"
import validUser from "../middleware/validUser.js"

const router = express.Router()

router.post("/login", async (req, res) => {
    const user = req.body
    const userFound = await userService.getUsersByEmail(user)
    if (!userFound) {
        return res.status(404).render("msgConectedFail")
    }
    if (userFound.password === user.password) {
        delete user.password
        req.session.user = user
        req.session.logged = true

        if (userFound.role === "admin") {
            req.session.admin = true
        } else {
            req.session.admin = false
        }
    } else {
        return res.status(404).render("msgConectedFail")
    }
    return res.render("msgConected", { name: userFound.name })
})

router.post("/", validUser, async (req, res) => {
    const { name, email, password, role } = req.body
    const userCreated = await userService.createUser({
        name,
        email,
        password,
        role
    })
    return res.render("msgConected", { name: userCreated.name })
})

export default router