import express from "express"
import ProductManager from '../src/class/ProductManager.js'

const app = express()
const manager = new ProductManager("./data/products.json")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/products", async (req, res) => {
    const allProdcuts = await manager.conferProduct()
    try {
        res.status(200).json(allProdcuts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get("/products/limit", async (req, res) => {
    const { limit } = req.query
    const allProdcuts = await manager.conferProduct()
    const providedLimit = allProdcuts.slice(0, limit)
    return res.status(200).json(providedLimit)
})

app.get("/products/id/:pid", async (req, res) => {
    const { pid } = req.params
    const foundProductById = await manager.getProductById(Number(pid))
    try {
        if (!foundProductById) {
            res.status(404).json("Produto não existe.")
        } else {
            res.status(200).json(foundProductById)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get("/products/name/:title", async (req, res) => {
    const { title } = req.params
    const foundProductByName = await manager.getProductByName(title)
    try {
        if (!foundProductByName) {
            res.status(404).json("Produto não existe.")
        } else {
            res.status(200).json(foundProductByName)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default app