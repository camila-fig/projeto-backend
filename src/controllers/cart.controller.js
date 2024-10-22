//import userService from "../service/user.service"
//import productsService from "../service/products.service"

const renderCart = async (req, res) => {

    //     let user = await userService.getAllUsers()
    //     user = user.map((u) => u.toJSON())
    //     user = user[0]

    res.render("cart")
}

export default { renderCart }