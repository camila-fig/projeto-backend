import express from "express"
import validRole from "../middleware/validRole.js"
import productsService from "../service/products.service.js"

const router = express.Router()

router.get("/", (req, res) => { res.render("index") })

router.get("/chat", (req, res) => { res.render("chat") })

router.get("/admin", validRole, async (req, res) => {
    const result = await productsService.getProductsList()
    const productsOrdered = result.sort((a, b) => a.code - b.code).sort((a, b) => a.title.localeCompare(b.title))
    const products = productsOrdered.map((product) => product.toJSON())
    res.render("admin", { products, productsOrdered })
})

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.clearCookie("connect.sid")
                .clearCookie("EmailLogged")
                .render("msgLogout")
        } else {
            res.send({ status: "Erro ao efetuar logout", body: err })
        }
    })
})

router.get("/edit/:pid", async (req, res) => {
    const { pid } = req.params
    let product = await productsService.getProductById(String(pid))
    let resultProduct = [product]
    resultProduct = resultProduct.map((product) => product.toJSON())
    res.render("edit", { product: resultProduct[0] })
})

export default router