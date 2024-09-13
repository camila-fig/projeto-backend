import productModel from "../model/product.model.js"

const getProducts = async () => {
    const products = await productModel.find({})
    return products
}

export default { getProducts }

