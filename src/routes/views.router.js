import express from "express"
import productsService from "../service/products.service.js"
import validCart from "../middleware/validCart.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.render("index")
})

router.get("/chat", (req, res) => {
  res.render("chat")
})

router.get("/products", async (req, res) => {
  let products = await productsService.getProducts()
  products = products.map((product) => product.toJSON())
  res.render("products", { products })
})

router.get("/products/:pid", async (req, res) => {
  const { pid } = req.params
  const foundProductById = await productsService.getProductById(String(pid))
  try {
    if (!foundProductById) {
      res.status(404).json("Produto não existe.")
    } else {
      res.render("product", {
        title: foundProductById.title,
        category: foundProductById.category,
        description: foundProductById.description,
        price: foundProductById.price,
        thumbnail: foundProductById.thumbnail,
        stock: foundProductById.stock,
        _id: pid
      })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/cart/:cid", validCart, async (req, res) => {
  try {
    const { cid } = req.params
    const { pid } = req.params
    const addProduct = await manager.addProductToCart({ IdProduct: Number(pid), IdCart: Number(cid) })
    res.status(201).json(addProduct)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})



export default router