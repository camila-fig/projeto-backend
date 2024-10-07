import express from "express"
import cartService from "../service/cart.service.js"
import validCart from "../middleware/validCart.js"

const router = express.Router()

router.get("/", async (req, res) => {
    let cookieMail = req.cookies.EmailLogged
    if (cookieMail == undefined) {
        res.render("msgCart")
    } else {
        res.redirect('/:email')
    }

})

router.get("/:email", async (req, res) => {
    const { email } = req.cookies.EmailLogged


    // if (cookieMail == undefined) {
    //     const { email } = "withoutEmail"
    //     res.render("msgCart")
    // } else {
    //     console.log("Cookie:", cookieMail)
    //     const { email } = cookieMail
    //     //const cart = await cartService.addProductToCart(pid, cid)

    res.render("cart")
    // }
})

export default router