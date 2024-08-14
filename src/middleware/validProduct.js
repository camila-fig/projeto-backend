const validProduct = (req, res, next) => {
    if (!req.body.title || !req.body.description || !req.body.price || !req.body.code || !req.body.stock || !req.body.status || !req.body.category) {
    return res.status(404).json({message: "Dados invalidos"})
    }
     next()
   }
   
export default validProduct