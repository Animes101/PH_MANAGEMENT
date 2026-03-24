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

export const AccessTokenValidation = Joi.object({
  refreshToken: Joi.string()
    .required()
    .messages({
      "string.base": "refreshToken must be a string",
      "string.empty": "refreshToken is required",
      "any.required": "refreshToken is required"
    })
});