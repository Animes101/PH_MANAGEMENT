import Joi from 'joi';

export const createUserValidation = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'User ID is required',
    'string.empty': 'User ID cannot be empty',
  }),

  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
  }),

  needPassword: Joi.boolean().required().messages({
    'any.required': 'NeedPassword is required',
  }),

  role: Joi.string()
    .valid('admin', 'student', 'faculity')
    .required()
    .messages({
      'any.only': 'Role must be admin, student or faculity',
      'any.required': 'Role is required',
    }),

  status: Joi.string()
    .valid('in-progress', 'blocked')
    .required()
    .messages({
      'any.only': 'Status must be in-progress or blocked',
    }),

  isDelete: Joi.boolean().required().messages({
    'boolean.base': 'isDelete must be boolean',
  }),

  createAt: Joi.string().isoDate().required().messages({
    'string.isoDate': 'createAt must be a valid ISO date',
  }),
});



