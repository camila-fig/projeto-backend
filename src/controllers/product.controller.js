import productsService from "../service/products.service.js"
import validRole from "../middleware/validRole.js"

const showProducts = async (req, res) => {
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
}

const showOrganizedProducts = async (req, res) => {
  const result = await productsService.getProductsList()
  const productsOrdered = result.sort((a, b) => a.code - b.code).sort((a, b) => a.title.localeCompare(b.title))
  const products = productsOrdered.map((product) => product.toJSON())
  res.render("admin", { products, productsOrdered })
}

const showAProduct = async (req, res) => {
  const { pid } = req.params
  const foundProductById = await productsService.getProductById(String(pid))
  const logged = req.cookies['logged']

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
        isLogged: logged === 'true'
      })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const showProducysById = async (req, res) => {
  const { pid } = req.params
  let product = await productsService.getProductById(String(pid))
  let resultProduct = [product]
  resultProduct = resultProduct.map((product) => product.toJSON())
  res.render("edit", { product: resultProduct[0] })
}

const createProduct = async (req, res) => {
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
}

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params
    const productDeleted = await productsService.deleteProduct(String(pid))
    return res.status(200).json({ message: productDeleted })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body
    const { pid } = req.params
    await productsService.updateProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    }, pid)
    return res.status(201).redirect("/")
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default { showProducts, showAProduct, showOrganizedProducts, showProducysById, createProduct, deleteProduct, updateProduct }