const express = require("express")
const passport = require("passport")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth")
const basketRoutes = require("./routes/basket")
const productsRoutes = require("./routes/products")
const keys = require("./config/keys")
const app = express()

mongoose.connect(keys.mongoURI)
    .then(() => console.log("MongoDB connected."))
    .catch(error => console.log(error))

app.use(passport.initialize())
require("./middleware/passport")(passport)

app.use(require("cors")())
app.use("/uploads", express.static("uploads"))
app.use(require("morgan")("dev"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/api/auth", authRoutes)
app.use("/api/basket", basketRoutes)
app.use("/api/products", productsRoutes)

module.exports = app
