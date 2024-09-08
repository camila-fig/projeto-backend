import CartManager from '../../src/class/CartManager.js'
//import ProductManager from '../../src/class/ProductManager.js'

const manager = new CartManager("./data/cart.json")
//const managerProduct = new ProductManager("./data/products.json")

const productsInCart = async (req, res) => {
    const ProdcutsAddToCart = await manager.conferCart()
    try {
        res.status(200).json(ProdcutsAddToCart)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createCart = async (req, res) => {
    try {
        const cartCreated = await manager.createCart()
        return res.status(200).json(cartCreated)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getById = async (req, res) => {
    const { cid } = req.params
    const foundCartById = await manager.getCartById(Number(cid))
    try {
        if (!foundCartById) {
            res.status(404).json("Carrinho não existe.")
        } else {
            res.status(200).json(foundCartById)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const addToCart = async (req, res) => {
    try {
        const { cid } = req.params
        const { pid } = req.params
        const addProduct = await manager.addProductToCart({ IdProduct: Number(pid), IdCart: Number(cid) })
        res.status(201).json(addProduct)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default { productsInCart, createCart, getById, addToCart }