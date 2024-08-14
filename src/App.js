import express from "express"
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/products', productsRouter)
app.use('/cart', cartRouter)

export default app