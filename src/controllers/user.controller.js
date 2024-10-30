import userService from "../dao/mongo/user.service.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jsonwebtoken.js"
import { isValidatePassword } from "../utils/bcrypt.js"
import program from "../config/commander.js"

isValidatePassword

const login = async (req, res) => {
    const { email, password } = req.body

    let user = await userService.getUsersByEmail({ email })
    user = [user].map((u) => u.toJSON())
    user = user[0]
    //console.log("User user.router", user)

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

    return res
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        })
        .cookie("logged", true)
        .render("msgConected", {
            name: user.name,
            isAdmin: user.role === "admin",
            isUser: user.role === "user",
            port: program.opts().p
        })
}

const renderLogin = (req, res) => { res.render("login") }

const createUser = async (req, res) => {
    const user = req.body
    const accessToken = generateToken(user)
    return res
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        })
        .cookie("logged", true)
        .render("msgConected", { 
            name: req.body.name,
            port: program.opts().p
        })
}

const failregister = (req, res) => {
    res.render("msgUserExists")
}

const logout = (req, res) => {
    res.clearCookie("connect.sid")
        .clearCookie("accessToken")
        .clearCookie("logged")
        .render("msgLogout")
}

export default { login, renderLogin, createUser, failregister, logout }