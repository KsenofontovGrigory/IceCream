const Basket = require("../Models/Basket")
const errorHandler = require("../utils/errorHandler")

module.exports.getAll = async (req, res) => {
    try {
        const products = await Basket.find({user: req.user.id})
        res.status(200).json(products)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.removeProduct = async (req, res) => {
    try {
        await Basket.remove({id: req.body.id})
        res.status(200).json({
            message: "Product is remove"
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.updateProduct = async (req, res) => {
    try {
        const update = await Basket.findOneAndUpdate(
            {_id: req.body.id},
            {$set: req.body}
        )
        res.status(200).json(update)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.addToBasket = async (req, res) => {
    try {
        const basket = await new Basket({
            name: req.body.name,
            img: req.body.img,
            cost: req.body.cost,
            count: req.body.count,
            user: req.user.id,
            productId: req.body.productId
        })
        await basket.save()
        res.status(201).json(basket)
    } catch (e) {
        errorHandler(res, e)
    }
}
