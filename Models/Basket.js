const mongoose = require("mongoose")
const Schema = mongoose.Schema

const basketSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: ""
    },
    cost: {
        type: Number,
        required: true
    },
    count: {
        type: Number
    },
    productId: {
        type: String,
        default: ""
    },
    user: {
        ref: "users",
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model("basket", basketSchema)