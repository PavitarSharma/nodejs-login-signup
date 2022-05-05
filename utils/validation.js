const Joi = require('@hapi/joi')

module.exports.registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().required().max(30),
        email: Joi.string().email().required().min(3).max(300),
        phone: Joi.string().required().min(8).max(200),
        password: Joi.string().required().min(3).max(400)
    })
    
    return schema.validate(data)
}

module.exports.loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().email().required().min(3).max(300),
        password: Joi.string().required().min(3).max(400)
    })
    
    return schema.validate(data)
}