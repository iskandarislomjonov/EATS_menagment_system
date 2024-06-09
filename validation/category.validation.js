import Joi from "joi";

export const categoryValidation = (name) => {
    const Category = Joi.object({
        name: Joi.string().min(3).required()
    });

    const { error } = Category.validate({ name });

    return error ? error.message : false;
};