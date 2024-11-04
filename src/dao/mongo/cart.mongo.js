import cartModel from "../../model/cart.model.js"
import productModel from "../../model/product.model.js"

// const createCart = async (cip, pid) => {
//     try {
//         const response = await fetch(`cart/${email}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })
//         if (response.ok) {
//             const cartCreated = await cartModel.create({ productId: pid, qty: 1 })
//             return cartCreated
//         } else {
//             console.error(`Erro ao adicionar o produto no carrinho. Status: ${response.status}`)
//         }
//     } catch (error) {
//         console.error(error)
//     }
//}

const getCart = async (email) => {
    try {
        const cart = await cartModel.findOne({ email })
        return cart
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const createCartByEmail = async (email) => {
    try {
        const cartCreated = await cartModel.create(email)
        return cartCreated
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addProductToCart = async (pid) => {
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

export default { createCartByEmail, addProductToCart, getCart }