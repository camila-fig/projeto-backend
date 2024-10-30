//import userService from "../dao/mongo/user.service"
//import productsService from "../dao/mongo/products.service"

const renderCart = async (req, res) => {

    if (não-tem-produtos) {
        res.render("msgEmptyCart")
    } else {
        res.render("cart")
    }
}


export default { renderCart }