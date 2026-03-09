import Joi from "joi";

export const createAdminValidationSchema = Joi.object({

  id: Joi.string().required(),

  user: Joi.string().required(),

  name: Joi.string().trim().required(),

  age: Joi.number().required(),

  gender: Joi.string()
    .valid("MALE", "FEMALE", "OTHER")
    .required(),

  dateOfBirth: Joi.string().required(),

  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required(),

  email: Joi.string()
    .email()
    .required(),

  phoneNumber: Joi.string().required(),

  address: Joi.string().required(),

  isActive: Joi.string()
    .valid("active", "inactive")
    .default("active"),

  isDelete: Joi.boolean()
    .default(false),
});