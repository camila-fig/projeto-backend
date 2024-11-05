import persistence from "../config/persistence.config.js"
import cartDaoLocal from "../dao/local/cart.local.js"
import productDaoLocal from "../dao/local/product.local.js"
import cartDaoMongo from "../dao/mongo/cart.mongo.js"
import chatDaoMongo from "../dao/mongo/chat.mongo.js"
import productDaoMongo from "../dao/mongo/product.mongo.js"
import userDaoMongo from "../dao/mongo/user.mongo.js"

let dtoCart
let dtoProduct
let dtoChat
let dtoUser

console.log("Persistencia:", persistence)

switch (persistence) {
    case "mongo":
        dtoCart = cartDaoMongo
        dtoProduct = productDaoMongo
        dtoChat = chatDaoMongo
        dtoUser = userDaoMongo
        break
    case "local":
        dtoCart = cartDaoLocal
        dtoProduct = productDaoLocal
        break
}

export default { dtoCart, dtoProduct, dtoChat, dtoUser }