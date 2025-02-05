import program from "../config/commander.config.js"
import cartService from "../services/cart.service.js"
import productService from "../services/product.service.js"

const productsCart = async (req, res) => {
    const email = req.user.email
    try {
        const foundCart = await cartService.getCartByEmail(email)
        req.logger.debug("Carrinho populado com sucesso")

        if (!foundCart) {
            req.logger.debug("Carrinho vazio")
            return res.render("msgEmptyCart")
        }

        let totalPrice = 0
        const products = cartService.filterProducts(foundCart)

        for (let item of foundCart.products) {
            const product = await productService.getProductById(item.product._id)
            totalPrice += product.price * item.qty
        }

        return res.status(200).render("cart", {
            email: req.user.email,
            name: req.user.name,
            products,
            totalPrice: totalPrice,
            port: program.opts().p
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const addCart = async (req, res) => {
    const pid = req.body.pid
    const email = req.user.email

    try {
        let cart = await cartService.getCartByEmail(email)
        if (!cart) {
            req.logger.debug(`Carrinho não existe e será criado para o e-mail ${email}.`)
            cart = await cartService.createCart(email)
        }

        const addProduct = await cartService.addProductToCart(pid, email)
        req.logger.debug(`O produto com id ${pid} foi anexado no carrinho de ${email}`)

        const products = cartService.filterProducts(addProduct)

        return res.status(200).json({ products })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateCart = async (req, res) => {
    const pid = req.params
    const email = req.user.email

    try {
        const updatedCart = await cartService.updateCart(pid, email)
        req.logger.debug(`O carrinho de ${email} foi atualizado com sucesso`)

        const foundCart = await cartService.getCartByEmail(email)
        const products = cartService.filterProducts(foundCart)

        return res.status(200).json({ products })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const finalizePurchase = async (req, res) => {
    const email = req.user.email

    try {
        const foundCart = await cartService.getCartByEmail(email)

        if (!foundCart || !foundCart.products || foundCart.products.length === 0) {
            req.logger.error(`Carrinho vazio ou não encontrado para o usuário ${email}`)
            return res.status(400).json({ message: "Carrinho vazio." })
        }

        const products = []

        for (let item of foundCart.products) {
            req.logger.debug(`Processando produto com ID: ${item.product._id}`)
            const product = await productService.getProductById(item.product._id)

            if (!product) {
                req.logger.error(`Produto com ID ${item.product._id} não encontrado.`);
                return res.status(404).json({ message: `Produto com ID ${item.product._id} não encontrado` });
            }

            if (product.stock < item.qty) {
                req.logger.warn(`Estoque insuficiente para o produto: ${product.title}.`)
                return res.status(400).json({
                    message: `Estoque insuficiente para o produto: ${product.title}. Por favor, remova este item do carrinho e continue suas compras.`,
                })
            }

            products.push({
                product: product,
                quantity: item.qty,
            })
        }

        for (let item of foundCart.products) {
            const product = await productService.getProductById(item.product._id)
            const updatedStock = product.stock - item.qty
            await productService.updateProduct(product._id, { stock: updatedStock })
        }

        await cartService.clearCart(email)

        req.logger.debug(`Compra finalizada com sucesso para o usuário ${email}`)
        return res.status(200)
            .json({
                message: `Compra finalizada com sucesso!`,
                products: products,
            })

    } catch (error) {
        req.logger.error(`Erro ao finalizar a compra: ${error.message}`)
        return res.status(500).json({ message: "Erro interno no servidor. Tente novamente mais tarde." })
    }
}

export default { productsCart, addCart, updateCart, finalizePurchase }