import mongoose from 'mongoose'

const productsCollection = "products"

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {
        type: Number,
        unique: true
    },
    stock: Number,
    status: String,
    category: String
});

const productModel = mongoose.model(productsCollection, productSchema)

export default productModel