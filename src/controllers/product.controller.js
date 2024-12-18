import program from "../config/commander.config.js"
import dao from "../dao/factory.js"

const showProducts = async (req, res) => {
  const { title, page, limit } = req.params
  let result
  if (title === "all") {
    result = await dao.dtoProduct.getAllProducts(page, limit)
  } else {
    result = await dao.dtoProduct.getProducts(title, page, limit)
  }
  const products = result.docs.map((product) => product.toJSON())
  res.render("products", {
    products,
    result,
    port: program.opts().p
  })
}

const showOrganizedProducts = async (req, res) => {
  const result = await dao.dtoProduct.getProductsList()
  const productsOrdered = result.sort((a, b) => a.code - b.code).sort((a, b) => a.title.localeCompare(b.title))
  const products = productsOrdered.map((product) => product.toJSON())
  res.render("admin", {
    products,
    productsOrdered,
    port: program.opts().p
  })
}

const showAProduct = async (req, res) => {
  const { pid } = req.params
  const foundProductById = await dao.dtoProduct.getProductById(String(pid))
  const role = req.cookies['role']

  try {
    if (!foundProductById) {
      res.status(404).json("Produto não existe.")
    } else {
      res.render("product", {
        product: foundProductById,
        _id: foundProductById._id,
        title: foundProductById.title,
        category: foundProductById.category,
        description: foundProductById.description,
        price: foundProductById.price,
        thumbnail: foundProductById.thumbnail,
        stock: foundProductById.stock,
        code: foundProductById.code,
        isAdmin: role === "admin",
        isUser: role === "user",
      })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const showProducysById = async (req, res) => {
  const { pid } = req.params
  let product = await dao.dtoProduct.getProductById(String(pid))
  req.logger.debug(`O produto com id ${pid}, foi obtido.`)
  let resultProduct = [product]
  resultProduct = resultProduct.map((product) => product.toJSON())
  res.render("edit", { product: resultProduct[0] })
}

const createProduct = async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body
    const productCreated = await dao.dtoProduct.createProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    })
    req.logger.debug(`O produto (${title}), foi criado com sucesso.`)
    return res.render("msgProduct")
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params
    const productDeleted = await dao.dtoProduct.deleteProduct(String(pid))
    req.logger.debug(`O produto com id ${pid} foi deletado.`)
    return res.status(200).json({ message: productDeleted })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body
    const { pid } = req.params
    await dao.dtoProduct.updateProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    }, pid)
    req.logger.debug(`Produto com id ${pid} foi atualizado com sucesso.`)
    return res.status(201).redirect("/")
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default { showProducts, showAProduct, showOrganizedProducts, showProducysById, createProduct, deleteProduct, updateProduct }