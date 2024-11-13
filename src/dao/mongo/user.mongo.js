import userModel from "../../model/user.model.js"
import { createHash } from "../../config/bcrypt.config.js"

const createUser = async ({ name, email, password, role }) => {
    try {
        const newPass = createHash(password)
        const userCreated = await userModel.create({
            name,
            email,
            password: newPass,
            role
        })
        console.info("Usuário criado com sucesso.")
        return userCreated
    } catch (error) {
        console.error("Erro ao criar usuário:", error)
    }

}

const getUsersById = async (uid) => {
    try {
        const user = await userModel.findById(uid)
        return [user]
    } catch (error) {
        console.error("Erro ao obter o usuário pelo Id:", error)
    }
}

const getUsersByEmail = async (user) => {
    try {
        const userFound = await userModel.findOne({ email: user.email })
        return userFound
    } catch (error) {
        console.error("Erro ao obter o usuário pelo e-mail:", error)
    }
}

const getAllUsers = async () => {
    try {
        const users = await userModel.find({})
        return users
    } catch (error) {
        console.error("Erro ao obter todos os usuários:", error)
    }
}

export default { createUser, getUsersById, getUsersByEmail, getAllUsers }