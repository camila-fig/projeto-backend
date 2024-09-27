const validRole = (req, res, next) => {
    if (req.session?.admin) {
        return next()
    } else {
        res.render("msgForbidden")
    }
}

export default validRole