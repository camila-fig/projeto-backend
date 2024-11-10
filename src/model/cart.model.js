import mongoose from 'mongoose'

const cartsCollection = "carts"

const cartSchema = new mongoose.Schema({
    users: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
    },
    email: String,
    products: {
        type: [
            {
                product:
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                qty: Number
            }
        ],
        default: []
    }
})

cartSchema.pre("find", function () {
    this.populate("products.product")
})

const cartModel = mongoose.model(cartsCollection, cartSchema)

export default cartModel