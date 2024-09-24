import productModel from "../model/product.model.js"

const getAllProducts = async (page, limit) => {
    try {
        const options = {
            page: page,
            limit: limit
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

const createProduct = async ({ title, description, price, thumbnail, code, stock, status, category }) => {
    const productCreated = await productModel.create({ title, description, price, thumbnail, code, stock, status, category })
    return productCreated
}

const getProductByCode = async (code) => {
    const resultParsed = await productModel.find({})
    const productByCode = resultParsed.find((product) => product.code === code)
    return resultParsed[productByCode]
}

const deleteProduct = async (pid) => {
    const productDeleted = await productModel.deleteOne({ _id: pid });
    return productDeleted
}

const updateProduct = async ({title, description, price, thumbnail, code, stock, status, category}) => {
    const productUpdated = await productModel.updateOne(
        {_id:pid},
        {title, description, price, thumbnail, code, stock, status, category}
    )
    return productUpdated
}

export default { getAllProducts, getProducts, getProductById, getProductByCode, deleteProduct, createProduct, updateProduct }

