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
    console.log("Cheguei aqui1")
    //try {
    const allProducts = await productModel.find({})
    const foundProduct = allProducts[pid]

    console.log("Cheguei aqui2")

    if (foundProduct) {
        const updateCart = async ({ pid, qty }) => {
            const cartUpdated = await cartModel.updateOne({ productId: pid, qty: qty + 1 })
            return cartUpdated
        }
    } else {
        const addNewProduct = await productModel.create({ productId: pid, qty: 1 })
        return addNewProduct
    }
    //} catch (error) {
    //     res.status(500).json({ message: error.message })
    //}
}

export default { conferAllCart, createCart, addProductToCart, getCartByEmail }