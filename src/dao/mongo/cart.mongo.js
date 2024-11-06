import cartModel from "../../model/cart.model.js"
import productModel from "../../model/product.model.js"

const conferAllCart = async () => {
    const resultInCart = await cartModel.find()
    return resultInCart
}

const getCartByEmail = async (email) => {
    try {
        const cart = await cartModel.findOne({ email })
        return cart
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createCart = async () => {
    try {
        const cartCreated = await cartModel.create()
        return cartCreated
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addProductToCart = async ({ pid, cid }) => {
    try {
        const allCarts = await cartModel.find({})
        let foundCart = allCarts[cid]

        if (!foundCart || foundCart === -1) {
            const createCart = await cartModel.create()
            foundCart = createCart[cid]
            return foundCart
        }

        console.log("foundCart:", foundCart)

        const allProducts = await productModel.find({})
        const foundProduct = allProducts[pid]

        console.log("foundProduct:", foundProduct)

        if (foundProduct) {
            const updateCart = async ({ pid, qty }) => {
                foundCart = await cartModel.updateOne({ product: pid, qty: qty + 1 })
                return foundCart
            }
        } else {
            foundCart = await cartModel.updateOne({ product: pid, qty: 1 })
            return foundCart
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default { conferAllCart, createCart, addProductToCart, getCartByEmail }