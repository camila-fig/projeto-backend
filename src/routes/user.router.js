import express from "express"
import userService from "../service/user.service.js"
import validUser from "../middleware/validUser.js"

const router = express.Router()

router.post("/", validUser, async (req, res) => {
    const { name, email, password } = req.body
    const userCreated = await userService.createUser({
       name,
       email,
       password
    })
    return res.render("msgConected", { name: userCreated.name })
})

export default router