//import userService from "../service/user.service"
//import productsService from "../service/products.service"

const renderCart = async (req, res) => {

    if (não-tem-produtos) {
        res.render("msgEmptyCart")
    } else {
        res.render("cart")
    }
}


export default { renderCart }