import Joi from "joi";

export const createTeacherValidation = Joi.object({
  name: Joi.string().required(),

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

  department: Joi.string().required(), // ObjectId string

  isActive: Joi.string()
    .valid("active", "inactive")
    .optional(),

  isDelete: Joi.boolean().optional(),

}); 


export const updateTeacherValidaion = Joi.object({
  name: Joi.string().optional(),

  age: Joi.number().optional(),

  gender: Joi.string()
    .valid("MALE", "FEMALE", "OTHER")
    .optional(),

  dateOfBirth: Joi.string().optional(),

  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .optional(),
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().optional(),
  address: Joi.string().optional(),
  designation: Joi.string().optional(),
  department: Joi.string().optional(), 


}); 