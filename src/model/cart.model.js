import mongoose from 'mongoose'

const cartsCollection = "carts"

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: String,
            qty: Number
        }]
})

cartSchema.pre("find", function () {
    this.populate("products.productId")
})


const cartModel = mongoose.model(cartsCollection, cartSchema)

export default cartModel