import userModel from "../model/user.model.js"

const createUser = async ({ name, email, password }) => {
    const userCreated = await userModel.create({ name, email, password })
    return userCreated
}

export default { createUser }