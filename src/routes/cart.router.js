import express from "express"
import cartService from "../service/cart.service.js"
import userService from "../service/user.service.js"
import validCart from "../middleware/validCart.js"
import passport from "passport"

const router = express.Router()

router.get("/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {

        let user = await userService.getAllUsers()
        user = user.map((u) => u.toJSON())
        user = user[0]

        res.render("cart")

    })

//router.get("/:email", async (req, res) => {
    
    // if (cookieMail == undefined) {
    //     const { email } = "withoutEmail"
    //     res.render("msgCart")
    // } else {
    //     console.log("Cookie:", cookieMail)
    //     const { email } = cookieMail
    //     //const cart = await cartService.addProductToCart(pid, cid)

   // res.render("cart")
    // }
//})

export default router