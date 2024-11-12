import express from "express"

const router = express.Router()

router.get("/", (req,res) => {
    req.logger.warn("Aqui")
    res.send("Olá, tudo certo?")
})

export default router