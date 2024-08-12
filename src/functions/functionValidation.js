import Joi  from 'joi';


function validationAuth(form) {
    let validUser = Joi.object({
        name: Joi.string().min(2).max(20),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{8,16}$/)),
        repeat_password: Joi.ref('password'),
        phone: Joi.string().pattern(new RegExp(/^(01)[0-2,5]{1}[0-9]{8}$/)),
        ConfirmEmailNum: Joi.string().length(4).pattern(/^[0-9]+$/)
    })
    return validUser.validate(form, { abortEarly: false })

};

function validationCategoryAndBrandAndCoupon(form) {
    let validUser = Joi.object({
        name: Joi.string().min(2).max(20),
        image: Joi.object().length(0),
        expires: Joi.date().min(2),
        discount: Joi.object().min(1),
        title: Joi.object().min(2).max(200),
    })
    return validUser.validate(form, { abortEarly: false })

};

function validationProduct(form) {
    let validUser = Joi.object({
        name: Joi.string().min(2).max(50),
        description: Joi.string().min(10).max(5000),
        images: Joi.array().length(3),
        image: Joi.object().length(0),
        categoryId: Joi.string(),
        subCategoryId: Joi.string(),
        BrandId: Joi.string(),
        price: Joi.number(),
        quantity: Joi.number(),
        discount: Joi.number(),
    })
    return validUser.validate(form, { abortEarly: false })

};




export { validationProduct, validationAuth, validationCategoryAndBrandAndCoupon }