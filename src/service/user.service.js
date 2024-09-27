import userModel from "../model/user.model.js"

const createUser = async ({ name, email, password,role }) => {
    const userCreated = await userModel.create({ name, email, password, role })
    return userCreated
}

const getUsersById = async (uid) => {
    const user = await userModel.findById(uid)
    return [user]
}

const getUsersByEmail = async (user) => {
    const userFound = await userModel.findOne({ email: user.email })
    //console.log("UserFound", userFound)
    return userFound
}

export default { createUser, getUsersById, getUsersByEmail }