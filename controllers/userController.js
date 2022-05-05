const User = require('../models/User')
const bcrypt = require('bcrypt')
const genAuthToken = require('../utils/genAuthToken')
const { registerValidation, loginValidation } = require('../utils/validation')

module.exports.register = async (req, res, next) => {
    try {

        // const schema = Joi.object({
        //     name: Joi.string().required().max(30),
        //     email: Joi.string().required().min(3).max(300),
        //     phone: Joi.string().required().min(8).max(200),
        //     password: Joi.string().required().min(3).max(400)
        // })

        const { error } = registerValidation(req.body)
        if(error) {
            return res.status(400).json(error.details[0].message)
        }

        let user = await User.findOne({email :req.body.email})
        if(user) {
            return res.status(404).json("User already exit!")
        }


        user = await new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        })

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)

        user.password = hashPassword

        await user.save()

        const token = await genAuthToken(user)

        return res.status(200).json(token)


    }catch(err) {
        return res.status(500).json("Error: " + err.message)
    }
}


module.exports.login = async (req, res, next) => {
    try {
       
        const { error } = loginValidation(req.body)
        if(error) {
            return res.status(400).json(error.details[0].message)
        }

        let user = await User.findOne({email :req.body.email})
        if(!user) {
            return res.status(404).json("Invalid email and password")
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) {
            return res.status(404).json("Invalid email and password")
        }


        const token = await genAuthToken(user)

        return res.status(200).json({
            message: 'User logged in successfully',
            token
        })


    }catch(err) {
        return res.status(500).json("Error: " + err.message)
    }
}