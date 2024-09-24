import express from "express"

const router = express.Router()

const validRole = (req, res, next) => {
    if (req.session?.admin) {
        return next()
    } else {
        res.render("msgForbidden")
    }
}

router.get("/", (req, res) => { res.render("index") })
router.get("/chat", (req, res) => { res.render("chat") })
router.get("/admin", validRole, (req, res) => {
    console.log("Admin:", req.session)
    res.render("admin")
})
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.render("msgLogout")
        } else {
            res.send({ status: "Erro ao efetuar logout", body: err })
        }
    })
})

export default router