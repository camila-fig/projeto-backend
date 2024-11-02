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
    const cart = await cartModel.findOne({ email })
    return cart
}

const createCartByEmail = async (email) => {
    const cartCreated = await cartModel.create(email)
    return cartCreated
}

const addProductToCart = async ({ pid }) => {
    
    console.log("Cheguei aqui1")

    const allProducts = await productModel.find({})
    const foundProduct = allProducts[pid]

    console.log("Cheguei aqui2") 

    try {
        const response = await fetch(`cart/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            if (foundProduct) {
                const updateCart = async ({ pid, qty }) => {
                    const cartUpdated = await cartModel.updateOne({ productId: pid, qty: qty + 1 })
                    return cartUpdated
                }
            } else {
                const addNewProduct = await productModel.create({ productId: pid, qty: 1 })
                return addNewProduct
            }
        } else {
            console.error(`Erro ao adicionar o produto no carrinho. Status: ${response.status}`)
        }
    } catch (error) {
        console.error(error)
    }
}

export default { createCartByEmail, addProductToCart, getCart }