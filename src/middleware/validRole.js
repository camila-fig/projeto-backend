const validRoleAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        return next()
    } else {
        res.status(403).render("msgForbidden")
    }
}

const validRoleUser = (req, res, next) => {
    if (req.user.role === "user") {
        return next()
    } else {
        res.status(403).render("msgForbidden")
    }
}

export default { validRoleAdmin, validRoleUser }