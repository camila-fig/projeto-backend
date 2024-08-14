import CartManager from '../../src/class/CartManager.js'

const manager = new CartManager("./data/products.json")

const createCart = async (req, res) => {
    try {
        const product = req.body
        const newProduct = await manager.addProduct(product)
        return res.status(201).json(newProduct)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getById = async (req, res) => {
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
}

const addToCart = async (req, res) => {
return res.status(200).json("Deu certo")
}

export default { createCart, getById, addToCart }