import transport from "../config/nodemailer.js"
import client from "../config/twilio.js"
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const renderMail = (req, res) => { res.render("mail") }

const mail = async (req, res) => {
    try {
        const { to, subject, text, file } = req.body
        if (!file) {
            const { to, subject, text } = req.body
            await transport.sendMail({
                from: 'Camila Figueiredo <camila.ium4256@gmail.com>',
                to: to,
                subject: subject,
                html: text,
                attachments: [],
            })
        } else {
            const pathImage = __dirname + `/../../public/image/${file}`
            await transport.sendMail({
                from: 'Camila Figueiredo <camila.ium4256@gmail.com>',
                to: to,
                subject: subject,
                html: `<div>${text}</div> <img src='${file}' width='50%'/>`,
                attachments:
                    [{
                        filename: file || null,
                        path: pathImage,
                    }],
            })
        }
        return res.status(201)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const whats = async (req, res) => {
    try {
        const { to } = req.body;
        await client.messages.create({
            //from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
            //to: `whatsapp:${to}`,
            //body: text,
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
            contentSid: 'HX229f5a04fd0510ce1b071852155d3e75',
            contentVariables: '{"1":"409173"}',
            to: `whatsapp:${to}`,
        })
        return res.status(201)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export default { mail, renderMail, whats }