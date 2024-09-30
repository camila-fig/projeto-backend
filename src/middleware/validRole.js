const validRole = (req, res, next) => {
    if (req.session?.admin) {
        return next()
    } else {
        res.status(403).render("msgForbidden")
    }
}

export default validRole