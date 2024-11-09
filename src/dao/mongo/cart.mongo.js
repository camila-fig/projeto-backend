import cartModel from "../../model/cart.model.js"
import userModel from "../../model/user.model.js"

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

const createCart = async (email) => {
    try {
        console.log("tentando criar carrinho")
        console.log("Email cart.mongo:", email)

        const user = await userModel.findOne({ email }).exec()
        if (!user) {
            throw new Error("Usuário não encontrado com esse e-mail.")
        }

        let cart = await cartModel.create({
            users: user._id,
            email: email,
            products: []
        })
        console.log("carrinho novo criado:", cart)
        return cart
    } catch (error) {
        console.error("Erro ao tentar criar o carrinho:", error)
        throw error
    }
}

const addProductToCart = async (pid, cid, email) => {
    try {
        let cart = await cartModel.findOne({ email })

        console.log("cid do mongo", cid)
        console.log("pid do mongo", pid)
        console.log("Cart:", cart)

        const idProductInCart = cart.products
        const ifHaveProduct = idProductInCart.find(item => item.product.toString() === pid)

        console.log("idProductInCart:", idProductInCart)
        console.log("ifHaveProduct:", ifHaveProduct)

        if (ifHaveProduct) {
            console.log("entrei aqui1")
            const qty = ifHaveProduct.qty
            ifHaveProduct.qty = qty + 1
        } else {
            console.log("entrei aqui2")
            idProductInCart.push({ product: pid, qty: 1 })
            console.log("Produto novo inserido.")
        }
        console.log("cheguei no final do cart.mongo")
        await cart.save()
        return cart
    } catch (error) {
        console.error("Erro ao tentar add produto no carrinho", error)
    }
}

export default { conferAllCart, createCart, addProductToCart, getCartByEmail }