import express from "express"
import validProduct from "../middleware/validProduct.js"
import productsService from "../service/products.service.js"
//import productController from "../controllers/productController.js"

const router = express.Router()

//Rotas com FileSystem
//router.get("/", productController.getAllProducts)
//router.get("/find", productController.getLimitProducts)
//router.get("/:pid", productController.getById)
//router.post("/", validProduct, productController.createProduct)
//router.put("/:pid", productController.updateProductById)
//router.delete("/:pid", productController.deleteProduct)

//Rotas com Mongoose
router.get("/:title/:page/:limit", async (req, res) => {
  const { title, page, limit } = req.params
  let result
  if (title === "all") {
    result = await productsService.getAllProducts(page, limit)
  } else {
    result = await productsService.getProducts(title, page, limit)
  }
  const products = result.docs.map((product) => product.toJSON())
  // delete result.docs
  res.render("products", { products, result })
  //console.log("Resultado:", result)
})

router.get("/:pid", async (req, res) => {
  const { pid } = req.params
  const foundProductById = await productsService.getProductById(String(pid))
  //console.log(foundProductById._id)
  try {
    if (!foundProductById) {
      res.status(404).json("Produto não existe.")

    } else {
      res.render("product", {
        _id: foundProductById._id,
        title: foundProductById.title,
        category: foundProductById.category,
        description: foundProductById.description,
        price: foundProductById.price,
        thumbnail: foundProductById.thumbnail,
        stock: foundProductById.stock,
        code: foundProductById.code,
        isAdmin: req.session.admin
      })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/", validProduct, async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body
    const productCreated = await productsService.createProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    })
    return res.render("msgProduct")
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    const productDeleted = await productsService.deleteProduct(String(pid))
    return res.status(200).json({ message: productDeleted })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

router.put("/:pid", validProduct, async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body
    const { pid } = req.params
    await productsService.updateProduct({ title, description, price, thumbnail, code, stock, status, category }, pid)
    return res.status(201).redirect("/")
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router