import program from "../config/commander.config.js"
import userService from "../services/user.service.js"

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const { user, accessToken } = await userService.loginUser(email, password)
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
                port: program.opts().p,
            })
    } catch (error) {
        req.logger.info(error.message)
        return res.status(400).render("msgConectedFail")
    }
}

const renderLogin = (req, res) => {
    res.render("login")
}

const createUser = async (req, res) => {
    const user = req.body
    try {
        const accessToken = await userService.createUser(user)
        req.logger.debug("Usuário criado com sucesso.")
        return res
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60,
            })
            .cookie("role", user.role)
            .render("msgConected", {
                name: user.name,
                port: program.opts().p,
            })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const failregister = (req, res) => {
    res.render("msgUserExists");
}

const logout = (req, res) => {
    res.clearCookie("connect.sid")
        .clearCookie("accessToken")
        .clearCookie("role")
        .render("msgLogout")
}

export default { login, renderLogin, createUser, failregister, logout }