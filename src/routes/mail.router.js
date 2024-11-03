import express from "express"
import mailController from "../controllers/mail.controller.js"

const router = express.Router()

router.get("/", mailController.renderMail)

router.post("/", mailController.mail)

export default router