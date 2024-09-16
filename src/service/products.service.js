import productModel from "../model/product.model.js"

const getProducts = async () => {
    const products = await productModel.find({})
    return products
}

const getProductById = async (idProduct) => {
    const resultParsed = await productModel.find({})
    const index = resultParsed.findIndex((product) => product.id === idProduct)
    return resultParsed[index]
}

export default { getProducts, getProductById }

