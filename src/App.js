import express from "express"
import handlebars from "express-handlebars"
import mongoose from "mongoose"
import path from "path"
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import chatRouter from './routes/chat.router.js'
//import viewRouter from './routes/views.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const pathView = path.join(`${__dirname}/views`)
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", pathView)

//const staticPath = path.join(`${__dirname}/../public`)
//console.log(staticPath)

app.use('/', viewsRouter)
app.use('/products', productsRouter)
app.use('/cart', cartRouter)
app.use('/chat', chatRouter)

mongoose
  .connect(
    "mongodb+srv://dbCamila:K719xAxHmVo1MX1b@codercluster.vp1hh.mongodb.net/?retryWrites=true&w=majority&appName=CoderCluster"
  )
  .then(() => {
    console.log("Mongo conectado");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

export default app