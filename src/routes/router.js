import express from "express"
import viewsRouter from './views.router.js'
import productsRouter from './products.router.js'
import userRouter from './user.router.js'
import cartRouter from './cart.router.js'
import chatRouter from './chat.router.js'
import githubRouter from './session.router.js'

const router = express.Router()

router.use('/', viewsRouter)
router.use('/products', productsRouter)
router.use('/user', userRouter)
router.use('/api/sessions', githubRouter)
router.use('/chat', chatRouter)
router.use('/cart', cartRouter)

export default router