import Joi from "joi";


export const loginValidation = Joi.object({
  body: Joi.object({
    id: Joi.string().required(),
    password: Joi.string().required(),
  }),
});


export const changePassword = Joi.object({

    oldpassword: Joi.string().required(),
    newpassword: Joi.string().required(),
});