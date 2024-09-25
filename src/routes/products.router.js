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
    result = await productsService.getAllProducts()
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
        stock: foundProductById.stock
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


// router.delete("/", async (req, res) => {
//     try {
//         const { pid } = req.body
//         const productDeleted = await productsService.deleteProduct(pid)
//         return res.status(200).json({ message: productDeleted })
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// })


// router.put("/", async (req, res) => {
//     try {
//         const { code } = req.body
//         const { pid } = req.body
//         await productsService.updateProduct(code, pid)
//         return res.status(201).json("Tudo certo");
//     } catch (error) {
//       res.status(500).json({message: error.message})
// }
// })

export default router