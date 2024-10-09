import express from "express"
import cookieParser from "cookie-parser"
import handlebars from "express-handlebars"
import session from "express-session"
import mongoose from "mongoose"
import path from "path"
import passport from "passport"
import initializePassport from "./config/passport.config.js"
import 'dotenv/config'

import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'
import userRouter from './routes/user.router.js'
import cartRouter from './routes/cart.router.js'
import chatRouter from './routes/chat.router.js'
import githubRouter from './routes/session.router.js'

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
//app.use(passport.session())

app.use('/', viewsRouter)
app.use('/products', productsRouter)
app.use('/user', userRouter)
app.use('/cart', cartRouter)
app.use('/chat', chatRouter)
app.use('/api/sessions', githubRouter)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo conectado")
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })

export default app