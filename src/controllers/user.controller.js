//import userService from "../dao/mongo/user.mongo.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../config/jsonwebtoken.config.js"
import { isValidatePassword } from "../config/bcrypt.config.js"
import program from "../config/commander.config.js"
import dao from "../dao/factory.js"

isValidatePassword

const login = async (req, res) => {
    const { email, password } = req.body
    let user = await dao.dtoUser.getUsersByEmail({ email })
    if (!user) {
        req.logger.info(`O usuário com email ${email} ainda não foi cadastrado no banco de dados.`)
        return res
            .status(400)
            .render("msgConectedFail")
    }
    user = [user].map((u) => u.toJSON())
    user = user[0]
    req.logger.info(`O usuário com email ${email} foi encontrado no banco de dados.`)
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
        .cookie("role", user.role)
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
    req.logger.debug("Usuário criado com sucesso.")
    return res
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        })
        .cookie("role", user.role)
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
        .clearCookie("role")
        .render("msgLogout")
}

export default { login, renderLogin, createUser, failregister, logout }