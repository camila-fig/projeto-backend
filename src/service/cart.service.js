import cartModel from "../model/cart.model.js"
import productModel from "../model/product.model.js"

const addProductToCart = async (pid, cid) => {
    const resultParsedInCart = cartModel.find({})
    const allProducts = await productModel.find({})
    const foundIdCart = resultParsedInCart[cid]
    const foundProduct = allProducts[pid]

    try {
        const response = await fetch(`cart/${cid}/product/${pid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            if (!foundIdCart || foundIdCart === -1) {
                const createCart = async ({ pid }) => {
                    const cartCreated = await cartModel.create({ productId: pid, qty: 1 })
                    return cartCreated
                }
            } else {
                if (foundProduct) {
                    const updateCart = async ({ pid, qty }, cid) => {
                        const cartUpdated = await cartModel.updateOne({ _id: cid }, { productId: pid, qty: qty + 1 })
                        return cartUpdated
                    }
                } else {
                    const addNewProduct = await productModel.create({ productId: pid, qty: 1 })
                    return addNewProduct
                }
            }
            alert(`Produto adicionado ao carrinho.`)
        } else {
            console.error(`Erro ao adicionar o produto no carrinho. Status: ${response.status}`)
            //  Exibir mensagem de erro ou realizar outra ação apropriada 
        }
    } catch (error) {
        console.error(error)
        // Exibir mensagem  de erro ou realizar outra ação apropriada 
    }
}

export default { addProductToCart }