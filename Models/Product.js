const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    img: {
        type: String,
        default: ""
    },
    cost: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("product", productSchema)