import Joi, { string } from "joi";

const schema = Joi.object({
     content : string().required(),
        fileUrl : string().uri().required()
})

export const messageValidator = async (data : any) => {
    return schema.validateAsync(data);
}