import CartManager from '../dao/local/cart.local.js'
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
    const foundCart = await cartService.findCartPopulate(email)

    if (!foundCart) {
        res.render("msgEmptyCart")
    } else {
        const foundProducts = foundCart.products
        const filteredProducts = foundProducts.filter(item => item.qty > 0)
        const products = filteredProducts.map((item) => {
            const product = item.product
            return {
                qty: item.qty,
                _id: product._id,
                thumbnail: product.thumbnail,
                description: product.description,
                price: product.price
            }
        })
        res.render("cart", {
            email: req.user.email,
            name: req.user.name,
            products,
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
        const pid = req.body.pid
        const email = req.user.email

        let cart = await cartService.getCartByEmail(email)
        if (!cart) {
            cart = await cartService.createCart(email)
        }
        const addProduct = await cartService.addProductToCart(String(pid), email)

        res.redirect("/")
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateCart = async (req, res) => {
    try {
        const pid = req.params
        const email = req.user.email

        const updatedCart = await cartService.updateCart(pid, email)
        const foundCart = await cartService.findCartPopulate(email)
        const foundProducts = foundCart.products
        const filteredProducts = foundProducts.filter(item => item.qty > 0)
        const products = filteredProducts.map((item) => {
            const product = item.product
            return {
                qty: item.qty,
                _id: product._id,
                thumbnail: product.thumbnail,
                description: product.description,
                price: product.price
            }
        })
        res.json({ products })
        // .render("cart", {
        //     email: req.user.email,
        //     name: req.user.name,
        //     products,
        //     port: program.opts().p
        // })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default { createCart, productsInCart, productsCart, getById, addToCart, addCart, updateCart }