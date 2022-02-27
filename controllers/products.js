const Product = require("../Models/Product")
const errorHandler = require("../utils/errorHandler")

module.exports.getAll = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.createProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        img: req.body.img,
        description: req.body.img,
        cost: req.body.cost
    })
    try {
        await product.save()
        res.status(201).json(product)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async (req, res) => {
    try {
        const cart = await Product.findById(req.params.id)
        res.status(200).json(cart)
    } catch (e) {
        errorHandler(res, e)
    }
}
