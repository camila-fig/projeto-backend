import messageModel from "../../model/messages.model.js"

const createMsg = async (message) => {
    try {
        const msgCreated = await messageModel.create(message)
        return msgCreated
    } catch (error) {
        console.error("Erro ao tentar criar a mensagem", error)
    }
}

export default { createMsg }