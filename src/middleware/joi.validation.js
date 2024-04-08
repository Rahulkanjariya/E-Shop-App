const Joi = require("joi");

const validateInput = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            return res.status(400).json({ error: errorMessage });
        }

        next();
    };
};

const userRegisterSchema = Joi.object({
    userName: Joi.string().required(),
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required(),
    mobile: Joi.any().optional(),
    gender: Joi.any().optional(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
});

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


const adminRegisterSchema = Joi.object({
    userName: Joi.string().required(),
    name: Joi.string().required(),
    adminName: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required(),
    mobile: Joi.any().optional(),
    gender: Joi.any().optional(),
});

const adminLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


const sellerRegisterSchema = Joi.object({
    sellerCode: Joi.string().required(),
    sellerName: Joi.string().required(),
    sellerEmail: Joi.string().required(),
    password: Joi.string().required(),
    productName: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    mobile: Joi.string().required()
});

const sellerLoginSchema = Joi.object({
    sellerEmail: Joi.string().required(),
    password: Joi.string().required(),
})

module.exports = {
    userRegisterInput: validateInput(userRegisterSchema),
    userLoginInput: validateInput(userLoginSchema),
    adminRegisterInput: validateInput(adminRegisterSchema),
    adminLoginInput: validateInput(adminLoginSchema),
    sellerRegisterInput: validateInput(sellerRegisterSchema),
    sellerLoginInput: validateInput(sellerLoginSchema)
}