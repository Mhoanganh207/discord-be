import Joi from "joi";

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    displayName: Joi.string()
        .min(3)
        .max(30)
        .required()
})

export const userValidator = async (data: any) => {
    return await schema.validateAsync(data);
}