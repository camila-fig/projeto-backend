
import messageModel from "../model/messages.model.js"

const createMsg = async (message) => {
    console.log(message)
    const msgCreated = await messageModel.create(message)
    return msgCreated
}

export default { createMsg }