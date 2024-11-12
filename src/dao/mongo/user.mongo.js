import userModel from "../../model/user.model.js"
import { createHash } from "../../config/bcrypt.config.js"

const createUser = async ({ name, email, password, role }) => {
    const newPass = createHash(password)
    const userCreated = await userModel.create({
        name,
        email,
        password: newPass,
        role
    })
    return userCreated
}

const getUsersById = async (uid) => {
    const user = await userModel.findById(uid)
    return [user]
}

const getUsersByEmail = async (user) => {
    const userFound = await userModel.findOne({ email: user.email })
    return userFound
}

const getAllUsers = async () => {
    const users = await userModel.find({})
    return users
}

export default { createUser, getUsersById, getUsersByEmail, getAllUsers }