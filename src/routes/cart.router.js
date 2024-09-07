import express from "express"
import cartController from "../controllers/cartController.js"

const router = express.Router()

router.get("/", cartController.productsInCart)

router.post("/", cartController.createCart)

router.get("/:cid", cartController.getById)

router.post("/:cid/product/:pid", cartController.addToCart)


export default router