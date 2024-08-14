import express from "express"
import ProductManager from '../../src/class/ProductManager.js'

const router = express.Router()
const manager = new ProductManager("./data/products.json")

router.get("/", async (req, res) => {
    const allProdcuts = await manager.conferProduct()
    try {
        res.status(200).json(allProdcuts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/limit", async (req, res) => {
    const { limit } = req.query
    const allProdcuts = await manager.conferProduct()
    const providedLimit = allProdcuts.slice(0, limit)
    return res.status(200).json(providedLimit)
})

router.get("/:pid", async (req, res) => {
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

router.post("/", async (req, res) => {
    try {
        const product = req.body
        const newProduct = await manager.addProduct(product)
        return res.status(201).json(newProduct)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

router.put("/:pid", async (req, res) => {
    try {
        const product = req.body
        const { pid } = req.params
        const updateProduct = await manager.updateProduct(product, Number(pid))
        return res.status(200).json(updateProduct)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        await manager.deleteProductById(Number(pid))
        return res.status(204).send()
    } catch (error) { }
})

export default router