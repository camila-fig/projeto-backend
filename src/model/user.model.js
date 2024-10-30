import mongoose from 'mongoose'

const userCollection = "users"

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        default: "user"
    }
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel