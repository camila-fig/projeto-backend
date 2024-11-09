import mongoose from 'mongoose'

const cartsCollection = "carts"

const cartSchema = new mongoose.Schema({
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true 
    users: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
      },
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