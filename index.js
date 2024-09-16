import cartModel from "./src/model/cart.model.js"
import productModel from "./src/model/product.model.js"
import mongoose from "mongoose"


const main = async () => {
    mongoose
        .connect(
            "mongodb+srv://dbCamila:K719xAxHmVo1MX1b@codercluster.vp1hh.mongodb.net/?retryWrites=true&w=majority&appName=CoderCluster"
        )
        .catch((err) => {
            console.log(err)
            process.exit(1)
        });


    // POPULATE 
    //Cadastra um produto
    // productModel.create({
    //     title: "casaco",
    //     description: "casaco curto de couro sintético preto",
    //     price: 80.55,
    //     thumbnail: "image12.jpg",
    //     code: 73,
    //     stock: 15,
    //     status: "true",
    //     category: "casacos"
    // })

    //Cadastra um novo carrinho vazio
    //cartModel.create()


    //Para encontrar o produto e colocar no carrinho existente
    // let cart = await cartModel.find({ _id: "66e8a2cee9c121f397aad32e" })
    // let product = await productModel.findById("66e0d95fc4140a9675024c16")

    // cart[0].products.push({ productId: "66e0d95fc4140a9675024c16", qty: 1 })
    // await cartModel.updateOne({ _id: "66e8a2cee9c121f397aad32e" }, cart[0])

    let cart = await cartModel.find({ _id: "66e8a2cee9c121f397aad32e" })
    //.populate('products.productId')
    console.log(cart[0].products)
}

main()