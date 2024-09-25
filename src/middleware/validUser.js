const validUser = (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(404).json({ message: "Dados invalidos" })
  }
  next()
}

const validRole = (req, res, next) => {
  if (req.session?.admin) {
    return next()
  } else {
    res.render("msgForbidden")
  }
}

export default { validUser, validRole }