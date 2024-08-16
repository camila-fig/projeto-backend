import fs from "fs"
export default class CartManager {
    #pathData
    // #products
    #id = 0
    #qty = 1

    constructor(path) {
        this.#pathData = path
        // this.#products = []
    }

    #readCartFile = async () => {
        let result = await fs.promises.readFile(this.#pathData, "utf-8")
        const resultParsedInCart = await JSON.parse(result)
        return resultParsedInCart
    }

    #readProductsFile = async () => {
        let resultProduct = await fs.promises.readFile("../../data/products.json", "utf-8")
        const resultParsed = await JSON.parse(resultProduct)
        return resultParsed
    }

    #recordCartFile = async (data) => {
        await fs.promises.writeFile(this.#pathData, JSON.stringify(data))
    }

    // getProducts = () => this.#products

    createCart = async () => {
        const resultParsedMessy = await this.#readCartFile()
        const resultParsedInCart = await resultParsedMessy.sort((a, b) => {
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
        })

        let id
        if (!resultParsedInCart.at(-1)) {
            id = 1
        } else {
            id = resultParsedInCart.at(-1).id + 1
        }
        this.#id = id

        let products = []

        const cart = {
            id: this.#id,
            products
        }

        resultParsedInCart.push(cart)

        await this.#recordCartFile(resultParsedInCart)
        return cart
    }

    getCartById = async (idCart) => {
        const resultParsed = await this.#readCartFile()
        const index = resultParsed.findIndex((cart) => cart.id === idCart)
        return resultParsed[index]
    }




    addProductToCart = async ({ productId, quantity }) => {
      
        let qty
        if (!resultParsedInCart.at(-1)) {
            qty = 0
        } else {
            qty = resultParsedInCart.at(-1).qty + quantity
        }
        this.#qty = qty

        const allProducts = await this.#readProductsFile()
        const selectedProdut = allProducts[productId].id - 1
        const nameProduct = allProducts[productId].title

        let cart = {
            id: this.#id,
            productId: selectedProdut,
            qty: this.#qty,
            title: nameProduct
        }

        if (productId === 0) {
            console.log("Insira um valor diferente de zero.")
            return false
        }

        resultParsedInCart.push(cart)

        await this.#recordCartFile(resultParsedInCart)
        return console.log(cart, selectedProdut)
    }



    // addProductToCart = async ({ productId, quantity }) => {
    //     const resultParsedMessy = await this.#readCartFile()
    //     const resultParsedInCart = await resultParsedMessy.sort((a, b) => {
    //         return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
    //     })

    //     let id
    //     if (!resultParsedInCart.at(-1)) {
    //         id = 1
    //     } else {
    //         id = resultParsedInCart.at(-1).id + 1
    //     }
    //     this.#id = id

    //     let qty
    //     if (!resultParsedInCart.at(-1)) {
    //         qty = 0
    //     } else {
    //         qty = resultParsedInCart.at(-1).qty + quantity
    //     }
    //     this.#qty = qty

    //     const allProducts = await this.#readProductsFile()
    //     const selectedProdut = allProducts[productId].id - 1

    //     const cart = {
    //         id: this.#id,
    //         productId: selectedProdut,
    //         qty: this.#qty
    //     }

    //     if (productId === 0) {
    //         console.log("Insira um valor diferente de zero.")
    //         return false
    //     }

    //     resultParsedInCart.push(cart)

    //     await this.#recordCartFile(resultParsedInCart)

    //     return console.log(cart, selectedProdut)
    // }

    conferProductInCart = async () => {
        const resultParsedInCart = await this.#readCartFile()
        return console.log(resultParsedInCart)
    }
}


// const manager = new CartManager("../../data/cart.json")

// await manager.createCart()
// await manager.addProductToCart({ productId: 8, quantity: 2 })
// await manager.getCartById(2)
// await manager.conferProductInCart()
