const express = require("express")
const router = express.Router()
const controller = require("../controllers/basket")
const passport = require("passport")

router.get("/:id", passport.authenticate("jwt", {session: false}), controller.getAll)
router.delete("/:id", passport.authenticate("jwt", {session: false}), controller.removeProduct)
router.post("/:id", passport.authenticate("jwt", {session: false}), controller.addToBasket)
router.patch("/:id", passport.authenticate("jwt", {session: false}), controller.updateProduct)

module.exports = router;
