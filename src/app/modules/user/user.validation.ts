import Joi from 'joi';

export const createUserValidation = Joi.object({
  
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



