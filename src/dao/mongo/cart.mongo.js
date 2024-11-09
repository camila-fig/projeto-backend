import cartModel from "../../model/cart.model.js"

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
        //let cart = await cartModel.create({ email, products: [] })

        let cart = new cartModel({
            email: 'lara@gmail.com',
            products: [{ product: '66e0d95fc4140a9675024c18', qty: 2 }]
          });


        //let cart = new cartModel({
        //    email,
        //    products: [],
        //})
        await cart.save()
        console.log("carrinho novo criado", cartCreate)
        return cart
    } catch (error) {
        res.status(500).json({ message: error.message })
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