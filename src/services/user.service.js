import bcrypt from "bcryptjs"
import { generateToken } from "../config/jsonwebtoken.config.js"
import dao from "../dao/factory.js"

const loginUser = async (email, password) => {
    let user = await dao.dtoUser.getUsersByEmail({ email })
    if (!user) {
        throw new Error(`O usuário com email ${email} não foi encontrado.`)
    }
    user = [user].map((u) => u.toJSON())[0]

    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
        throw new Error("Senha inválida.")
    }

    const accessToken = generateToken(user)
    return { user, accessToken }
}

const createUser = async (userData) => {
    const accessToken = generateToken(userData)
    return accessToken;
}

const logoutUser = () => {
    return { message: "Usuário deslogado com sucesso." }
}

export default { loginUser, createUser, logoutUser }