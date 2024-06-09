import Joi from "joi";

export const courierRegisterValidation = (courier) => {
    const Courier = Joi.object({
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        phoneNumber: Joi.string().regex(/^\+998\s\d{2}\s\d{3}\s\d{4}$/).required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
    });

    const { error } = Courier.validate(courier);

    return error ? error.message : false;
};

export const courierLoginValidation = (courier) => {
    const Courier = Joi.object({
        phoneNumber: Joi.string().regex(/^\+998\s\d{2}\s\d{3}\s\d{4}$/).required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
    });

    const { error } = Courier.validate(courier);

    return error ? error.message : false;
};
