import CartManager from '../dao/local/cart.local.js'
import productsService from "../dao/mongo/product.mongo.js"
import cartService from "../dao/mongo/cart.mongo.js"
import program from "../config/commander.config.js"

const manager = new CartManager("../../data/cart.json")

const productsInCart = async (req, res) => {
    const ProdcutsAddToCart = await manager.conferCart()
    try {
        res.status(200).json(ProdcutsAddToCart)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const productsCart = async (req, res) => {
    const email = req.user.email
    const foundCart = await cartService.getCartByEmail(email)
    if (!foundCart) {
        res.render("msgEmptyCart")
    } else {
        const foundProducts = foundCart.products
        const products = await productsService.getProductById(String(foundProducts[0].product))
        res.render("cart", {
            products,
            cid: foundCart._id,
            port: program.opts().p
        })
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

// const getProdById = async (req, res) => {
//     const { pid } = sessionStorage.getItem("product-id")
//     const foundProductById = await productsService.getProductById(String(pid))
//     try {
//         res.render("products", {
//             _id: foundProductById._id,
//             title: foundProductById.title,
//             category: foundProductById.category,
//             description: foundProductById.description,
//             price: foundProductById.price,
//             thumbnail: foundProductById.thumbnail,
//             stock: foundProductById.stock,
//             code: foundProductById.code,
//         })
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }

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

const addCart = async (req, res) => {
    try {
        const pid = req.body._id
        const email = req.user.email

        console.log("REQ.USER.EMAIL:", req.user.email)
        console.log("REQ.BODY:", req.body)

        const foundCart = await cartService.getCartByEmail(email)
        const cid = foundCart.id

        //console.log("CID do controller:", cid)

        const addProduct = await cartService.addProductToCart(Number(pid), Number(cid))
        res.render("cart", {
            addProduct,
            cid: cid,
            port: program.opts().p
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default { createCart, productsInCart, productsCart, getById, addToCart, addCart }