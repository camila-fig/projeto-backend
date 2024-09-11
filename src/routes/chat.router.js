import express from "express"
import chatService from "../service/chat.service.js"

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const chat = req.body
        const msgCreated = await chatService.createMsg(chat)
        return res.render("msgSent", { name: msgCreated.name })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
});

export default router