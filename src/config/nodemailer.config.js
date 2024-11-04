import nodemailer from "nodemailer"
import 'dotenv/config'

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        type: "login",
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
})

export default transport