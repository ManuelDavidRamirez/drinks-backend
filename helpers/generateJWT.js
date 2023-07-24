const jwt = require("jsonwebtoken")

module.exports = (payload) => jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn : "2m"
})