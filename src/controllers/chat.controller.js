import chatService from "../dao/mongo/chat.service.js"

const msgChat = async (req, res) => {
    try {
        const chat = req.body
        const msgCreated = await chatService.createMsg(chat)
        return res.render("msgSent", { name: msgCreated.name })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const renderChat = (req, res) => { res.render("chat") }

export default { msgChat, renderChat }