import Joi from "joi";

export const registerValidation = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
});


export const loginValidation = Joi.object({
  body: Joi.object({
    id: Joi.string().required(),
    password: Joi.string().required(),
  }),
});