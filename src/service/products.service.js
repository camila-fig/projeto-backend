import productModel from "../model/product.model.js"

const getAllProducts = async () => {
    try {
        const options = {
            page: 1,
            limit: 10
        }
        const products = await productModel.paginate({}, options)
        return products
    } catch (error) {
        console.log("Erro ao paginar getAllProducts:", error)
    }
}

const getProducts = async (title, page, limit) => {
    try {
        const options = {
            page: page,
            limit: limit,
            sort: { price: 1 }
        }
        const products = await productModel.paginate({ title: title }, options)
        return products
    } catch (error) {
        console.log("Erro ao paginar getProducts:", error)
    }
}

const getProductById = async (idProduct) => {
    const resultParsed = await productModel.find({})
    const index = resultParsed.findIndex((product) => product.id === idProduct)
    return resultParsed[index]
}

export default { getAllProducts, getProducts, getProductById }

