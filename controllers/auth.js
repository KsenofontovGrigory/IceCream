const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../Models/User")
const keys = require("../config/keys")
const errorHandler = require("../utils/errorHandler")

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                userId: candidate._id,
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: "Passwords is not coincidence"
            })
        }
    } else {
        res.status(404).json({
            message: "User with this email not found"
        })
    }
}

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        res.status(409).json({
            message: "User with this email was created"
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}
