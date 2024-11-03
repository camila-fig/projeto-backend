import CartManager from '../dao/local/CartManager.js'
import productsService from "../dao/mongo/products.service.js"
import cartService from "../dao/mongo/cart.service.js"
import program from "../config/commander.js"

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
    const foundCart = await cartService.getCart(email)

    //console.log("Req User:", req.user)

    //console.log("Found Cart cid:", foundCart._id)
    //console.log("Found Products:", foundProducts[0].product)

    if (!foundCart) {
        res.render("msgEmptyCart")
    } else {
        const foundProducts = foundCart.products
        const products = await productsService.getProductById(String(foundProducts[0].product))
        //const quantity = foundCart.products[0].qty
        //console.log(products)

        res.render("cart", {
            products,
            cid: foundCart._id,
            port: program.opts().p
        })
        //res.send({ status: "success", cartExists })
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

const getProdById = async (req, res) => {
    const { pid } = sessionStorage.getItem("product-id")
    const foundProductById = await productsService.getProductById(String(pid))
    try {
        res.render("products", {
            _id: foundProductById._id,
            title: foundProductById.title,
            category: foundProductById.category,
            description: foundProductById.description,
            price: foundProductById.price,
            thumbnail: foundProductById.thumbnail,
            stock: foundProductById.stock,
            code: foundProductById.code,
        })
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
        const email = req.user.email
        const pid = req.body._id
        //console.log("REQ.:", req)
        //const pid = sessionStorage.getItem("product-id")
        const foundCart = await cartService.getCart(email)

        console.log("Email:", email)

        if (!foundCart) {
            const createdCart = await cartService.createCartByEmail(email)
        }

        const addProduct = cartService.addProductToCart(pid)
        const foundProducts = foundCart.products
        const products = await productsService.getProductById(String(foundProducts[0].product))

        res.render("cart", {
            products,
            port: program.opts().p
        })


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default { createCart, productsInCart, productsCart, getById, getProdById, addToCart, addCart }