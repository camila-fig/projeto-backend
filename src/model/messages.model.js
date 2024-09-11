import mongoose from 'mongoose'

const messagesCollection = "messages"

const messageSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    message: String
});

const messageModel = mongoose.model(messagesCollection, messageSchema);

export default messageModel