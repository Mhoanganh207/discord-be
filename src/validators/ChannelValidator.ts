import Joi from "joi";

const shema : Joi.ObjectSchema = Joi.object({
    name : Joi.string().min(3).max(30)
    .invalid('general')
    .required(),

    type : Joi.string().valid('TEXT','AUDIO','VIDEO').required()
});

export const channelValidator = async (data : any) => {
    return await shema.validateAsync(data);
}