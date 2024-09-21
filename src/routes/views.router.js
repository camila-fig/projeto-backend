import express from "express"

const router = express.Router()

router.get("/", (req, res) => { res.render("index") })
router.get("/login", (req, res) => { res.render("registerOrLogin") })
router.get("/chat", (req, res) => { res.render("chat") })
router.get("/admin", (req, res) => { res.render("admin") })

export default router