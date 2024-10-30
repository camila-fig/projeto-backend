import cartModel from "./src/model/cart.model.js"
import productModel from "./src/model/product.model.js"
import userModel from "./src/model/user.model.js"
import mongoose from "mongoose"
import 'dotenv/config'


const main = async () => {
    mongoose
        .connect(process.env.MONGO_URL)
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
    // cartModel.create({email: "camila@gmail.com"})

    //Cadastra um novo usuário
    //userModel.create({name: "Camila Figueiredo", email: "camila_fig@hotmail.com", password:123456, role: "admin"})

    //Para encontrar o produto e colocar no carrinho existente
    //  let cart = await cartModel.find({ _id: "66e8d901bb4d08a0aacbeb91" })
    //  let product = await productModel.find({ _id: "66e0d95fc4140a9675024c16" })
    // console.log("Carrinho:", cart)
    // console.log("Produto:", product)
    // cart[0].products.push({ product: "66e0d95fc4140a9675024c16", qty: 1 })
    // await cartModel.updateOne({ _id: "66e8d901bb4d08a0aacbeb91" }, cart[0])

    //Populate (não esquecer que no arq. cart.model tem o middleware "pre" que chama o populate)
    // let cart = await cartModel.find({ _id: "66e8d901bb4d08a0aacbeb91" })
    // console.log(cart[0].products)



    // AGGREGATION PIPELINE
    //Organiza o array de produtos do maior code para o menor, por categoria e agrupa pelo title
    //  const orderCategory = async (productCategory) => {
    //      const result = await productModel.aggregate([
    //          { $sort: { code: -1 } },
    //          { $match: { category: productCategory } },
    //         { $group: { _id: "$title", products: { $push: "$$ROOT" } } }
    //      ]);
    //      return result;
    //  }
    //  const result = await orderCategory("casacos");
    //  console.log(result)



    // PAGINAÇÃO
    //  const result = await productModel.paginate({ category: "casacos" }, { limit: 2, page: 1 })
    //  console.log(result)
}

main()