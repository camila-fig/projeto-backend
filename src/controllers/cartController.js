import CartManager from '../../src/class/CartManager.js'

const manager = new CartManager("./data/products.json")

const createCart = async (req, res) => {
    return res.status(200).json("Deu certo1")
}

const getById = async (req, res) => {
    return res.status(200).json("Deu certo2")
}

const addToCart = async (req, res) => {
return res.status(200).json("Deu certo3")
}

export default { createCart, getById, addToCart }



// tava pensando aqui se caso o carrinho for um objeto 

// let cart = {} 

// post('/cart', (req, res) => {
// const { idProduct, name, quantity } = req.body  

// tira o id da requisição 

// ai faz o if 

// if(cart[idProduct] {
//    cart[idProduct] += 1}
// else 
//     cart[idProduct] = 
//        name,
//        quantity: 1
// res.json(cart)