import fs from "fs"

export default class ProductManager {
    #pathData
    #products
    #id = 0

    constructor(path) {
        this.#pathData = path
        this.#products = []
    }

    #readFile = async () => {
        let result = await fs.promises.readFile(this.#pathData, "utf-8")
        const resultParsed = await JSON.parse(result)
        return resultParsed
    }

    #recordFile = async (data) => {
        await fs.promises.writeFile(this.#pathData, JSON.stringify(data))
    }

    getProducts = () => this.#products

    addProduct = async ({title, description, price, thumbnail, code, stock, status, category}) => {
        const resultParsedMessy = await this.#readFile()
        const resultParsed = await resultParsedMessy.sort((a, b) => {
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
        })

        let id
        if (!resultParsed.at(-1)) {
            id = 1
        } else {
            id = resultParsed.at(-1).id + 1
        }
        this.#id = id

        const product = {
            id: this.#id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        }

        resultParsed.push(product)

        await this.#recordFile(resultParsed)
        return product
    }

    conferProduct = async () => {
        const resultParsed = await this.#readFile()
        return resultParsed
    }

    getProductById = async (idProduct) => {
        const resultParsed = await this.#readFile()
        const index = resultParsed.findIndex((product) => product.id === idProduct)
        return resultParsed[index]
    }

    getProductByName = async (title) => {
        const resultParsed = await this.#readFile()
        const productFound = resultParsed.filter((product) => product.title.toLowerCase().includes(title.toLowerCase()))
        return productFound
    }

    updateProduct = async (dataToUpdate, idProduct) => {
        if (dataToUpdate.title || dataToUpdate.description || dataToUpdate.price || dataToUpdate.thumbnail || dataToUpdate.code || dataToUpdate.stock || dataToUpdate.status || dataToUpdate.category === undefined) {
            throw new Error("Produto não atualizado. Verifique se todos os dados foram preenchidos.")
        }

        const resultParsed = await this.#readFile()
        const index = resultParsed.findIndex((product) => product.id === +idProduct)

        const newProduct = { id: +idProduct, ...resultParsed[index], ...dataToUpdate }
        console.log(resultParsed[index])
        resultParsed[index] = newProduct

        await this.#recordFile(resultParsed)
        return resultParsed[index]
    }

    deleteProductById = async (idProduct) => {
        const resultParsed = await this.#readFile()
        const indexDelete = resultParsed.findIndex((product) => {
            return product.id === idProduct
        })

        if (indexDelete === undefined) {
            console.log("Produto não encontrado")
            return false
        } else {
            await resultParsed.splice(indexDelete, 1)
            await this.#recordFile(resultParsed)
            console.log(`O produto foi deletado com sucesso`)
        }
    }
}