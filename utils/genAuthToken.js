const jwt = require('jsonwebtoken')

const genAuthToken = async (user) => {
    const secretKey = process.env.JWT_SECRET_KEY

    const token = await jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
    }, secretKey);

    return token
}

module.exports = genAuthToken