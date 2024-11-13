const validCart = (req, res, next) => {
  if (!req.params.pid) {
    req.logger.warn("Verifique se o id do produto está chegando em req.params.id")
    return res.status(404).json({ message: "O produto solicitado não existe." })
  }
  next()
}

export default validCart