import ProductManager from '../../src/class/ProductManager.js'

const manager = new ProductManager("./data/products.json")

const getAllProducts = async (req, res) => {
    const allProdcuts = await manager.conferProduct()
    try {
        res.status(200).json(allProdcuts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getLimitProducts = async (req, res) => {
    const { limit } = req.query
    const allProdcuts = await manager.conferProduct()
    const providedLimit = allProdcuts.slice(0, limit)
    return res.status(200).json(providedLimit)
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

const createProduct = async (req, res) => {
    try {
        const product = req.body
        const newProduct = await manager.addProduct(product)
        return res.status(201).json(newProduct)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateProductById = async (req, res) => {
    try {
        const product = req.body
        const { pid } = req.params
        const updateProduct = await manager.updateProduct(product, Number(pid))
        return res.status(200).json(updateProduct)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params
        await manager.deleteProductById(Number(pid))
        return res.status(204).send()
    } catch (error) { }
}

export default { getAllProducts, getLimitProducts, getById, createProduct, updateProductById, deleteProduct }