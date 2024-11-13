const validUser = (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    req.logger.warn("Verifique se todos os dados foram preenchidos e se o usuário já possui conta.")
    return res.status(400).json({ message: "Faltam dados." })
  }
  next()
}

export default  validUser