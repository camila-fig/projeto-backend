const validUser = (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password ) {
    return res.status(404).json({ message: "Dados invalidos" })
  }
  next()
}

export default validUser