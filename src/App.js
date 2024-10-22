import express from "express"
import cookieParser from "cookie-parser"
import handlebars from "express-handlebars"
import session from "express-session"
import mongoose from "mongoose"
import path from "path"
import passport from "passport"
import initializePassport from "./config/passport.config.js"
import router from "./routes/router.js"
import 'dotenv/config'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const pathView = path.join(`${__dirname}/views`)
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", pathView)

const pathPublic = path.join(__dirname, '..', 'public')
app.use(express.static(pathPublic))

app.use(cookieParser())

app.use(session({
  secret: process.env.JWTPRIVATE_KEY,
  resave: false,
  saveUninitialized: false,
})
)

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use("/", router)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo connected")
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })

export default app