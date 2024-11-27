import bcrypt from "bcryptjs"

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidatePassword = (user, password) => {
    const valid = bcrypt.compareSync(user.password, password)
    return valid
}