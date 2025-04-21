import Joi from '@hapi/joi';

export const crudItemSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number()
        .required()
        .min(0)
        .messages({
            'any.required': 'Field "price" is required',
            'number.base': 'Field "price" must be a number',
            'number.min': 'Field "price" cannot be negative'
        })
});
