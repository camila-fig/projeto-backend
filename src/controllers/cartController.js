import CartManager from '../../src/class/CartManager.js'

const manager = new CartManager("./data/cart.json")

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
            res.status(404).json("Produto não existe.")
        } else {
            res.status(200).json(foundCartById)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}









const addToCart = async (req, res) => {
    return res.status(200).json("Deu certo3")
}

export default { createCart, getById, addToCart }


// let cart = {}

// post('/cart', (req, res) => {
// const { idProduct, name, quantity } = req.body

// tira o id da requisição

// ai faz o if

// if(cart[idProduct] {
//    cart[idProduct]*quantity += 1}
// else
//     cart[idProduct] = {
//        idProduct
//        name,
//        quantity: 1
// res.json(cart)