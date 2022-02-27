const express = require("express")
const router = express.Router()
const controller = require("../controllers/products")

router.get("/", controller.getAll)
router.post("/", controller.createProduct)
router.get("/:id", controller.getById)

module.exports = router;
