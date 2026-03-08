import Joi from "joi";

export const createTeacherValidation = Joi.object({

  name: Joi.string().required(),

  id: Joi.string().required(),

  user: Joi.string().required(),

  age: Joi.number().required(),

  gender: Joi.string()
    .valid("MALE", "FEMALE", "OTHER")
    .required(),

  dateOfBirth: Joi.string().required(),

  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required(),

  email: Joi.string().email().required(),

  phoneNumber: Joi.string().required(),

  address: Joi.string().required(),

  designation: Joi.string().required(),

  department: Joi.string().required(),

  isActive: Joi.string()
    .valid("active", "inactive")
    .optional(),

  isDelete: Joi.boolean().optional()

});