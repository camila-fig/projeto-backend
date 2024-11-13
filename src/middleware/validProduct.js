const validProduct = (req, res, next) => {
  if (!req.body.title || !req.body.description || !req.body.price || !req.body.thumbnail || !req.body.code || !req.body.stock || !req.body.status || !req.body.category) {
    req.logger.warn("Verifique se todos os campos foram preenchidos corretamente.")
    return res.status(400).json({ message: "Dados invalidos" })
  }
  next()
}

export default validProduct