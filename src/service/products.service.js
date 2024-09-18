import productModel from "../model/product.model.js"

const getAllProducts = async () => {
    const products = await productModel.find({})
    return products
}

const getProducts = async (title, page, limit) => {
    const options = {
        page: page,
        limit: limit
    }
    const products = await productModel.paginate({ title: title }, options)
    return products
}

const getProductById = async (idProduct) => {
    const resultParsed = await productModel.find({})
    const index = resultParsed.findIndex((product) => product.id === idProduct)
    return resultParsed[index]
}

export default { getAllProducts, getProducts, getProductById }

