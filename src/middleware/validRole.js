const validRoleAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        req.logger.info("Como admin, não será possível acessar o carrinho e o chat")
        return next()
    } else {
        res.status(403).render("msgForbidden")
    }
}

const validRoleUser = (req, res, next) => {
    if (req.user.role === "user") {
        req.logger.info("Como user, não será possível acessar a área restrita e o mail")
        return next()
    } else {
        res.status(403).render("msgForbidden")
    }
}

export default { validRoleAdmin, validRoleUser }