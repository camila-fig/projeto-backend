import transport from "../config/nodemailer.js"

const renderMail = (req, res) => { res.render("mail") }

const mail = async (req, res) => {
    try {
        const { to, subject, text } = req.body
        await transport.sendMail({
            from: 'Camila Figueiredo <camila.ium4256@gmail.com>',
            to: to,
            subject: subject,
            html: text,
            attachments: [],
        })
        return res.status(201)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export default { mail, renderMail }