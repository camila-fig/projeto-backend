//import CartManager from '../dao/local/cart.local.js'
import program from "../config/commander.config.js"
import dao from "../dao/factory.js"

//const manager = new CartManager("../../data/cart.json")

// const productsInCart = async (req, res) => {
//     const ProdcutsAddToCart = await manager.conferCart()
//     try {
//         res.status(200).json(ProdcutsAddToCart)
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }

const productsCart = async (req, res) => {
    const email = req.user.email
    const foundCart = await dao.dtoCart.findCartPopulate(email)
    req.logger.debug("Carrinho populado com sucesso")
    try {
        if (!foundCart) {
            req.logger.debug("Carrinho vazio")
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
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// const createCart = async (req, res) => {
//     try {
//         const cartCreated = await manager.createCart()
//         return res.status(200).json(cartCreated)
//     } catch (error) {
//         return res.status(500).json({ error: error.message })
//     }
// }

// const getById = async (req, res) => {
//     const { cid } = req.params
//     const foundCartById = await manager.getCartById(Number(cid))
//     try {
//         if (!foundCartById) {
//             res.status(404).json("Carrinho não existe.")
//         } else {
//             res.status(200).json(foundCartById)
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }

// const addToCart = async (req, res) => {
//     try {
//         const { cid } = req.params
//         const { pid } = req.params
//         const addProduct = await manager.addProductToCart({ IdProduct: Number(pid), IdCart: Number(cid) })
//         res.status(201).json(addProduct)
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }

const addCart = async (req, res) => {
    try {
        const pid = req.body.pid
        const email = req.user.email

        let cart = await dao.dtoCart.getCartByEmail(email)
        if (!cart) {
            req.logger.debug(`Carrinho não existe e será criado para o e-mail ${email}.`)
            cart = await dao.dtoCart.createCart(email)
        }
        const addProduct = await dao.dtoCart.addProductToCart(String(pid), email)
        req.logger.debug(`O produto com id ${pid} foi anexado no carrinho de ${email}`)
        res.redirect("/")
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateCart = async (req, res) => {
    try {
        const pid = req.params
        const email = req.user.email

        const updatedCart = await dao.dtoCart.updateCart(pid, email)
        req.logger.debug(`O carrinho de ${email} foi atualizado com sucesso`)
        const foundCart = await dao.dtoCart.findCartPopulate(email)
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
        return res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default { productsCart, addCart, updateCart }