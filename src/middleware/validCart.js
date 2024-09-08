const validCart = (req, res, next) => {
    if (req.param.pid == undefined) {
    return res.status(404).json({message: "O produto solicitado não existe."})
    }
     next()
   }
   
export default validCart